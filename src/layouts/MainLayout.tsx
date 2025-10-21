import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            Örnek Navbar
            <main className="flex-1 p-6">
                {/* Sayfa içeriği buraya render edilir */}
                <Outlet />
            </main>
            Örnek Footer
        </div>
    );
}
