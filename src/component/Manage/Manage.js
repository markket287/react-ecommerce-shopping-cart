import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus, faMagnifyingGlass, faPen, faTrash, faBoxesStacked, faBox,
  faTriangleExclamation, faCircleXmark, faXmark, faRotateLeft, faMinus,
} from "@fortawesome/free-solid-svg-icons";
import fakeData from "../../fakeData";
import "./Manage.css";

const STORAGE_KEY = "inventory-products-v1";
const LOW_STOCK = 5; // stock of 1..5 counts as "Low Stock"
const EMPTY_FORM = { name: "", img: "", category: "", price: "", stock: "", description: "" };
const STATUS_LABEL = { in: "In Stock", low: "Low Stock", out: "Out of Stock" };

// Convert one item of your fakeData into the shape this page uses
const normalize = (p, i) => {
  const stock = Number(p.stock);
  return {
    key: String(p.key !== undefined ? p.key : "item-" + i),
    name: p.name || p.title || "Untitled product",
    img: p.img || p.image || "",
    category: p.category || "Uncategorized",
    price: Number(p.price) || 0,
    stock: Number.isFinite(stock) && stock >= 0 ? Math.floor(stock) : 0,
    description: p.description || "",
  };
};
const seed = () => (Array.isArray(fakeData) ? fakeData : []).map(normalize);

function loadProducts() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) return saved;
  } catch (e) { /* broken or blocked storage: fall back to the original data */ }
  return seed();
}
const getStatus = (stock) => (stock === 0 ? "out" : stock <= LOW_STOCK ? "low" : "in");
const money = (n) => "$" + Number(n).toFixed(2);

function Thumb({ src, name }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (!src || failed) return <div className="inv-thumb inv-thumb-empty">{name.charAt(0).toUpperCase()}</div>;
  return <img className="inv-thumb" src={src} alt={name} loading="lazy" onError={() => setFailed(true)} />;
}

function ProductModal({ initial, categories, onSave, onClose }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const isEdit = Boolean(initial.key);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    const price = Number(form.price);
    const stock = Number(form.stock);
    if (!form.name.trim()) err.name = "Product name is required.";
    if (form.price === "" || !(price >= 0)) err.price = "Enter a valid price (0 or more).";
    if (form.stock === "" || !Number.isInteger(stock) || stock < 0) err.stock = "Stock must be a whole number (0 or more).";
    setErrors(err);
    if (Object.keys(err).length) return;
    onSave({
      key: initial.key,
      name: form.name.trim(),
      img: form.img.trim(),
      category: form.category.trim() || "Uncategorized",
      price: Math.round(price * 100) / 100,
      stock,
      description: form.description.trim(),
    });
  };

  return (
    <div className="inv-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="inv-modal" role="dialog" aria-modal="true" aria-labelledby="inv-modal-title" onSubmit={submit} noValidate>
        <div className="inv-modal-head">
          <h2 id="inv-modal-title">{isEdit ? "Edit Product" : "Add New Product"}</h2>
          <button type="button" className="inv-icon-btn" aria-label="Close" onClick={onClose}><FontAwesomeIcon icon={faXmark} /></button>
        </div>
        <div className="inv-form-grid">
          <label className="inv-field inv-span2">Product Name
            <input autoFocus value={form.name} onChange={set("name")} placeholder="e.g. Wireless Headphones" maxLength={120} />
            {errors.name && <span className="inv-error">{errors.name}</span>}
          </label>
          <label className="inv-field inv-span2">Product Image URL
            <input value={form.img} onChange={set("img")} placeholder="https://..." />
          </label>
          <label className="inv-field">Category
            <input list="inv-categories" value={form.category} onChange={set("category")} placeholder="e.g. Electronics" maxLength={40} />
            <datalist id="inv-categories">{categories.map((c) => <option key={c} value={c} />)}</datalist>
          </label>
          <label className="inv-field">Price ($)
            <input type="number" min="0" step="0.01" value={form.price} onChange={set("price")} placeholder="0.00" />
            {errors.price && <span className="inv-error">{errors.price}</span>}
          </label>
          <label className="inv-field">Stock Quantity
            <input type="number" min="0" step="1" value={form.stock} onChange={set("stock")} placeholder="0" />
            {errors.stock && <span className="inv-error">{errors.stock}</span>}
          </label>
          <label className="inv-field inv-span2">Description
            <textarea rows={3} value={form.description} onChange={set("description")} placeholder="Short product description" maxLength={500} />
          </label>
        </div>
        <div className="inv-modal-actions">
          <button type="button" className="inv-btn inv-btn-ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="inv-btn inv-btn-primary">Save Product</button>
        </div>
      </form>
    </div>
  );
}

const Manage = () => {
  const [products, setProducts] = useState(loadProducts);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modal, setModal] = useState(null); // null = closed, otherwise the form values

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products)); } catch (e) { /* storage full or blocked */ }
  }, [products]);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))].sort(), [products]);
  const stats = useMemo(() => ({
    total: products.length,
    stock: products.reduce((sum, p) => sum + p.stock, 0),
    low: products.filter((p) => getStatus(p.stock) === "low").length,
    out: products.filter((p) => getStatus(p.stock) === "out").length,
  }), [products]);

  const visible = products.filter((p) =>
    p.name.toLowerCase().includes(query.trim().toLowerCase()) &&
    (categoryFilter === "all" || p.category === categoryFilter) &&
    (statusFilter === "all" || getStatus(p.stock) === statusFilter));

  const saveProduct = (data) => {
    if (data.key) setProducts(products.map((p) => (p.key === data.key ? { ...p, ...data } : p)));
    else setProducts([{ ...data, key: "custom-" + Date.now() }, ...products]);
    setModal(null);
  };
  const changeStock = (key, delta) =>
    setProducts(products.map((p) => (p.key === key ? { ...p, stock: Math.max(0, p.stock + delta) } : p)));
  const removeProduct = (p) => {
    if (window.confirm('Delete "' + p.name + '" from the inventory?')) setProducts(products.filter((x) => x.key !== p.key));
  };
  const resetData = () => {
    if (window.confirm("Reset the inventory to the original product data? Your changes will be lost.")) setProducts(seed());
  };
  const openEdit = (p) => setModal({ key: p.key, name: p.name, img: p.img, category: p.category, price: String(p.price), stock: String(p.stock), description: p.description });

  const cards = [
    { label: "Total Products", value: stats.total, icon: faBoxesStacked, tone: "purple" },
    { label: "Total Stock", value: stats.stock, icon: faBox, tone: "blue" },
    { label: "Low Stock", value: stats.low, icon: faTriangleExclamation, tone: "amber" },
    { label: "Out of Stock", value: stats.out, icon: faCircleXmark, tone: "red" },
  ];

  return (
    <div className="inv">
      <div className="inv-wrap">
        <header className="inv-hero">
          <div>
            <h1>Inventory Management</h1>
            <p>Manage your products and stock efficiently.</p>
          </div>
          <div className="inv-hero-actions">
            <div className="inv-search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by product name" aria-label="Search products by name" />
            </div>
            <button className="inv-btn inv-btn-light" onClick={() => setModal(EMPTY_FORM)}><FontAwesomeIcon icon={faPlus} /> Add Product</button>
          </div>
        </header>

        <p className="inv-note">Demo mode: changes are saved in this browser only (localStorage). There is no database or server behind this page.</p>

        <section className="inv-stats" aria-label="Inventory statistics">
          {cards.map((c) => (
            <div className="inv-stat" key={c.label}>
              <span className={"inv-stat-icon inv-" + c.tone}><FontAwesomeIcon icon={c.icon} /></span>
              <div><div className="inv-stat-value">{c.value}</div><div className="inv-stat-label">{c.label}</div></div>
            </div>
          ))}
        </section>

        <section className="inv-panel">
          <div className="inv-toolbar">
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} aria-label="Filter by category">
              <option value="all">All categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by stock status">
              <option value="all">All stock status</option>
              <option value="in">In Stock</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>
            <span className="inv-count">Showing {visible.length} of {products.length} products</span>
            <button className="inv-btn inv-btn-ghost inv-reset" onClick={resetData}><FontAwesomeIcon icon={faRotateLeft} /> Reset data</button>
          </div>

          {visible.length === 0 ? (
            <p className="inv-empty">{products.length === 0 ? "Your inventory is empty. Click Add Product to create one." : "No products match your search or filters."}</p>
          ) : (
            <table className="inv-table">
              <thead>
                <tr><th>Image</th><th>Product Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {visible.map((p) => {
                  const status = getStatus(p.stock);
                  return (
                    <tr key={p.key}>
                      <td data-label="Image"><Thumb src={p.img} name={p.name} /></td>
                      <td data-label="Product" className="inv-name">{p.name}</td>
                      <td data-label="Category">{p.category}</td>
                      <td data-label="Price">{money(p.price)}</td>
                      <td data-label="Stock">
                        <div className="inv-stepper">
                          <button aria-label={"Decrease stock of " + p.name} onClick={() => changeStock(p.key, -1)} disabled={p.stock === 0}><FontAwesomeIcon icon={faMinus} /></button>
                          <span>{p.stock}</span>
                          <button aria-label={"Increase stock of " + p.name} onClick={() => changeStock(p.key, 1)}><FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                      </td>
                      <td data-label="Status"><span className={"inv-badge inv-badge-" + status}>{STATUS_LABEL[status]}</span></td>
                      <td data-label="Actions">
                        <div className="inv-actions">
                          <button className="inv-btn inv-btn-small" onClick={() => openEdit(p)}><FontAwesomeIcon icon={faPen} /> Edit</button>
                          <button className="inv-btn inv-btn-small inv-btn-danger" onClick={() => removeProduct(p)}><FontAwesomeIcon icon={faTrash} /> Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      </div>

      {modal && <ProductModal initial={modal} categories={categories} onSave={saveProduct} onClose={() => setModal(null)} />}
    </div>
  );
};

export default Manage;