import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LocaleGate, ToEnglish } from "./components/Layout.tsx";
import { About } from "./pages/About.tsx";
import { CatalogPage } from "./pages/CatalogPage.tsx";
import { Contact } from "./pages/Contact.tsx";
import { GalleryPage } from "./pages/GalleryPage.tsx";
import { Home } from "./pages/Home.tsx";
import { Missing } from "./pages/Missing.tsx";
import { Privacy } from "./pages/Privacy.tsx";
import { ProductPage } from "./pages/ProductPage.tsx";
import { Quote } from "./pages/Quote.tsx";

const router = createBrowserRouter([
  {
    path: "/:locale",
    element: <LocaleGate />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "products", element: <CatalogPage category="all" titleKey="pages.productsTitle" introKey="pages.productsIntro" /> },
      { path: "water-tanks", element: <CatalogPage category="tanks" titleKey="pages.tanksTitle" introKey="pages.tanksIntro" tankFilters /> },
      { path: "bottles", element: <CatalogPage category="bottles" titleKey="pages.bottlesTitle" introKey="pages.bottlesIntro" /> },
      { path: "pipes", element: <CatalogPage category="pipes" titleKey="pages.pipesTitle" introKey="pages.pipesIntro" /> },
      { path: "ballers", element: <CatalogPage category="ballers" titleKey="pages.ballersTitle" introKey="pages.ballersIntro" /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "contact", element: <Contact /> },
      { path: "quote", element: <Quote /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "privacy", element: <Privacy /> },
      { path: "*", element: <Missing /> },
    ],
  },
  { path: "*", element: <ToEnglish /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
