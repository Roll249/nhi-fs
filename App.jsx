const mockProducts = [
    { id: 1, name: "iPhone 15 128GB", price: 21490000, image: "https://picsum.photos/seed/p1/420/300" },
    { id: 2, name: "Samsung Galaxy S24", price: 19990000, image: "https://picsum.photos/seed/p2/420/300" },
    { id: 3, name: "Xiaomi 14", price: 14990000, image: "https://picsum.photos/seed/p3/420/300" },
    { id: 4, name: "MacBook Air M3", price: 30990000, image: "https://picsum.photos/seed/p4/420/300" },
    { id: 5, name: "Dell XPS 13", price: 28990000, image: "https://picsum.photos/seed/p5/420/300" },
    { id: 6, name: "ASUS Vivobook 14", price: 17990000, image: "https://picsum.photos/seed/p6/420/300" },
    { id: 7, name: "iPad Air", price: 15990000, image: "https://picsum.photos/seed/p7/420/300" },
    { id: 8, name: "AirPods Pro", price: 5490000, image: "https://picsum.photos/seed/p8/420/300" },
    { id: 9, name: "Sony WH-1000XM5", price: 8990000, image: "https://picsum.photos/seed/p9/420/300" },
    { id: 10, name: "Apple Watch Series 9", price: 9990000, image: "https://picsum.photos/seed/p10/420/300" }
];

function formatVnd(number) {
    return number.toLocaleString("vi-VN") + " d";
}

function ProductCard({ product, onQuickView }) {
    return (
        <article className="card">
            <div className="img-wrap">
                <img src={product.image} alt={product.name} />
            </div>

            <div className="content">
                <h3 className="name">{product.name}</h3>
                <p className="price">{formatVnd(product.price)}</p>
                <button className="btn" onClick={() => onQuickView(product)}>
                    Xem nhanh
                </button>
            </div>
        </article>
    );
}

function ProductList({ products, onQuickView }) {
    return (
        <section className="grid">
            {products.map((item) => (
                <ProductCard key={item.id} product={item} onQuickView={onQuickView} />
            ))}
        </section>
    );
}

function App() {
    const [lastViewed, setLastViewed] = React.useState(null);

    function handleQuickView(product) {
        setLastViewed(product);
        console.log("Quick view:", product.id, product.name);
    }

    return (
        <main className="page">
            <header className="header">
                <div>
                    <h1 className="title">Buoi 1 - ProductCard Sample</h1>
                    <p className="sub">Bai hoc: JSX, props, event, map list. Muc tieu: render dung 10 item.</p>
                </div>
                <div className="counter">So san pham: {mockProducts.length}</div>
            </header>

            <ProductList products={mockProducts} onQuickView={handleQuickView} />

            <section className="notes">
                <strong>Trang thai demo:</strong>{" "}
                {lastViewed
                    ? `Ban vua bam: ${lastViewed.name} (${formatVnd(lastViewed.price)})`
                    : "Chua bam san pham nao. Thu bam nut 'Xem nhanh' tren moi card."}
            </section>
        </main>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
