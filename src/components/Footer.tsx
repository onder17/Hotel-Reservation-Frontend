export default function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10 bg-white dark:bg-zinc-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Neon Star Hotel</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            En iyi otelleri neon ışıklar altında keşfedin. Konfor, kalite ve
            güvenli rezervasyon.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Keşfet</h4>
          <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Oteller</li>
            <li>Kampanyalar</li>
            <li>Popüler Şehirler</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Kurumsal</h4>
          <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Hakkımızda</li>
            <li>Kariyer</li>
            <li>İletişim</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Yasal</h4>
          <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Gizlilik Politikası</li>
            <li>Kullanım Şartları</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/5 dark:border-white/5 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Neon Star Hotel. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}