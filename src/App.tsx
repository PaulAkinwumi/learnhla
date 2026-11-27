import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminGate from '@/components/admin/AdminGate';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminEnrollment from '@/pages/admin/Enrollment';
import AdminWebinars from '@/pages/admin/Webinars';
import AdminPublications from '@/pages/admin/Publications';
import AdminInsights from '@/pages/admin/Insights';
import AdminResources from '@/pages/admin/Resources';
import AdminInquiries from '@/pages/admin/Inquiries';
import Home from '@/pages/Home';
import ServicesPage from '@/pages/ServicesPage';
import CoursesPage from '@/pages/CoursesPage';
import CourseDetail from '@/pages/CourseDetail';
import EnrollPage from '@/pages/Enroll';
import WebinarsPage from '@/pages/Webinars';
import PublicationsPage from '@/pages/Publications';
import AboutPage from '@/pages/About';
import InsightsPage from '@/pages/Insights';
import ContactPage from '@/pages/Contact';
import ResourcesPage from '@/pages/Resources';
import PrivacyPage from '@/pages/Privacy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/courses/:slug/enroll" element={<EnrollPage />} />
          <Route path="/webinars" element={<WebinarsPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Route>
        <Route
          path="/admin"
          element={
            <AdminGate>
              <AdminLayout />
            </AdminGate>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="enrollment" element={<AdminEnrollment />} />
          <Route path="webinars" element={<AdminWebinars />} />
          <Route path="publications" element={<AdminPublications />} />
          <Route path="insights" element={<AdminInsights />} />
          <Route path="resources" element={<AdminResources />} />
          <Route path="inquiries" element={<AdminInquiries />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
