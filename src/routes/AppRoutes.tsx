import { Route, Routes } from 'react-router';
import { DetailsPage } from '../pages/product/DetailsPage';
import { ErrorPage } from '../pages/error/ErrorPage';
import { HomePage } from '../pages/home/HomePage';
import { CataloguePage } from '../pages/catalog/CatalogPage';
import { RegisterPage } from '../pages/register/RegisterPage';
import { LoginPage } from '../pages/login/LoginPage';
import { CartPage } from '../pages/cart/CartPage';
import { CheckoutPage } from '../pages/checkout/CheckoutPage';
import { OrderConfirmationPage } from '../pages/orderConfirmation/OrderConfirmationPage';
import { AdminPage } from '../pages/adminPage/AdminPage';
import { AdminCatalogPage } from '../pages/adminCatalogPage/AdminCatalogPage';
import { AccountPage } from '../pages/account/AccountPage';
import { ProfilePage } from "../pages/profile/ProfilePage";
import { OrdersPage } from "../pages/orders/OrdersPage";
import { RequireAdmin } from '../components/RequireAdmin';
import { LegalNoticePage } from '../pages/legal-notice/LegalNoticePage';
import { ContactPage } from '../pages/contact/ContactPage';
import { AdminOrdersPage } from '../pages/adminOrdersPage/AdminOrdersPage';
import { PrivacyPolicyPage } from '../pages/privacy-policy/PrivacyPolicyPage';
import { GeneralConditionOfSalePage } from '../pages/cgv/GeneralConditionOfSalePage';


export function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CataloguePage />} />
      <Route path="/catalog/:slug" element={<DetailsPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/cart/order" element={<CheckoutPage />} />
      <Route path="/cart/order/:id" element={<OrderConfirmationPage />} />
      <Route path="/admin" element={<RequireAdmin><AdminPage /></RequireAdmin>} />
      <Route path="/admin/trees" element={<RequireAdmin><AdminCatalogPage /></RequireAdmin>} />
      <Route path="/admin/orders" element={<RequireAdmin><AdminOrdersPage /></RequireAdmin>} />
      <Route path="/me" element={<AccountPage />} />
      <Route path="/me/profil" element={<ProfilePage />} />
      <Route path="/me/orders" element={<OrdersPage />} />
      <Route path="/legal-notice" element={<LegalNoticePage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/cgv" element={<GeneralConditionOfSalePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}