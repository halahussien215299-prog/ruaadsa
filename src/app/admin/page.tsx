"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Users,
  Clock,
  CheckCircle2,
  Phone,
  MessageCircle,
  Search,
  Filter,
  Trash2,
  LogOut,
  RefreshCw,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Download,
  AlertCircle,
  Eye,
  KeyRound,
  Lock,
} from "lucide-react";

interface LeadItem {
  _id: string;
  reference: string;
  name: string;
  phone: string;
  business?: string;
  packageId: string;
  packageName: string;
  timeline: string;
  contactMethod: string;
  status: "new" | "contacted" | "interested" | "not_interested" | "won" | "closed";
  priority: "high" | "medium" | "low";
  notes?: string;
  saleAmount?: number;
  source?: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [metrics, setMetrics] = useState({ total: 0, new: 0, contacted: 0, won: 0 });
  const [actionMsg, setActionMsg] = useState("");

  // Check auth and fetch leads
  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const url = new URL("/api/admin/leads", window.location.origin);
      if (statusFilter !== "all") url.searchParams.set("status", statusFilter);
      if (search.trim()) url.searchParams.set("search", search.trim());

      const res = await fetch(url.toString());
      if (res.status === 401) {
        setIsAuthenticated(false);
        setLeads([]);
        return;
      }

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setLeads(data.leads || []);
        if (data.metrics) setMetrics(data.metrics);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword("");
        fetchLeads();
      } else {
        setAuthError(data.message || "كلمة المرور غير صحيحة");
      }
    } catch {
      setAuthError("تعذر الاتصال بالخادم");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
    setLeads([]);
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((lead) => (lead._id === id ? { ...lead, status: newStatus as any } : lead))
        );
        setActionMsg("تم تحديث حالة الطلب بنجاح");
        setTimeout(() => setActionMsg(""), 3000);
      }
    } catch {
      alert("حدث خطأ أثناء التحديث");
    }
  };

  const handleDeleteLead = async (id: string, name: string) => {
    if (!confirm(`هل أنت متأكد من حذف طلب العميل: ${name}؟`)) return;

    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l._id !== id));
        setActionMsg("تم حذف الطلب بنجاح");
        setTimeout(() => setActionMsg(""), 3000);
      }
    } catch {
      alert("تعذر حذف الطلب");
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!leads.length) return;
    const headers = [
      "الرقم المرجعي",
      "الاسم",
      "رقم الجوال",
      "النشاط",
      "الباقة",
      "موعد التنفيذ",
      "وسيلة التواصل",
      "الحالة",
      "تاريخ الطلب",
    ];
    const rows = leads.map((l) => [
      l.reference,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.business || ""}"`,
      `"${l.packageName}"`,
      `"${l.timeline}"`,
      `"${l.contactMethod}"`,
      `"${l.status}"`,
      new Date(l.createdAt).toLocaleDateString("ar-SA"),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `rowad_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">جديد ⏳</span>;
      case "contacted":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">تم التواصل 📞</span>;
      case "interested":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-[#56138A]">مهتم ⭐</span>;
      case "won":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">تم البيع ✅</span>;
      case "not_interested":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">غير مهتم ✕</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  // If not authenticated -> Login Screen
  if (isAuthenticated === false) {
    return (
      <main className="min-h-screen bg-[#FAF9FC] flex flex-col items-center justify-center p-4 selection:bg-[#56138A] selection:text-white">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#ECE8F2] shadow-xl p-8 text-center relative overflow-hidden">
          <div className="w-20 h-20 relative mx-auto mb-4">
            <Image src={siteConfig.logo} alt="Logo" fill className="object-contain" priority />
          </div>

          <h1 className="text-xl font-black text-[#15101E]">لوحة تحكم إدارة الطلبات</h1>
          <p className="text-xs text-[#6B7280] mt-1">مؤسسة رواد الرقمية للدعاية والإعلان — المدينة المنورة</p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4 text-right">
            {authError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#15101E] mb-1.5">كلمة مرور الإدارة</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9FC] border border-[#D5CBE3] focus:border-[#56138A] focus:outline-none focus:ring-2 focus:ring-[#56138A]/10 text-sm text-[#15101E]"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#56138A] to-[#320853] hover:from-[#430B6E] hover:to-[#200435] shadow-md transition-all disabled:opacity-70"
            >
              {authLoading ? "جارٍ التحقق..." : "تسجيل الدخول إلى اللوحة"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#6B7280]">
            <Link href="/" className="hover:text-[#56138A] flex items-center gap-1 font-semibold">
              <span>← العودة إلى صفحة الموقع</span>
            </Link>
            <span>رواد الرقمية v1.0</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9FC] text-[#15101E] selection:bg-[#56138A] selection:text-white pb-20">
      {/* Top Navbar */}
      <header className="bg-white border-b border-[#ECE8F2] sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image src={siteConfig.logo} alt="Logo" fill className="object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-[#15101E]">لوحة متابعة الطلبات</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF2DC] text-[#966F13] border border-[#E9D6A0]">
                  MongoDB Atlas متصل
                </span>
              </div>
              <p className="text-[11px] text-[#6B7280]">مؤسسة رواد الرقمية — المدينة المنورة</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/video-studio"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-colors"
            >
              <span>أستوديو الفيديو 🎬</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-[#56138A] bg-[#F5EEFA] hover:bg-[#EBDCF7] transition-colors"
            >
              <span>معاينة صفحة الموقع</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={fetchLeads}
              disabled={loadingLeads}
              className="p-2 rounded-xl border border-[#ECE8F2] hover:bg-slate-50 text-[#56138A] transition-colors"
              title="تحديث البيانات"
            >
              <RefreshCw className={`w-4 h-4 ${loadingLeads ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Flash Message */}
        {actionMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionMsg}</span>
          </div>
        )}

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#ECE8F2] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-[#6B7280] font-semibold">إجمالي الطلبات</p>
              <h3 className="text-2xl font-black text-[#15101E] mt-1">{metrics.total}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F5EEFA] text-[#56138A] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#ECE8F2] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-[#6B7280] font-semibold">طلبات جديدة</p>
              <h3 className="text-2xl font-black text-amber-600 mt-1">{metrics.new}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#ECE8F2] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-[#6B7280] font-semibold">تم التواصل</p>
              <h3 className="text-2xl font-black text-blue-600 mt-1">{metrics.contacted}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#ECE8F2] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-[#6B7280] font-semibold">مبيعات مكتملة</p>
              <h3 className="text-2xl font-black text-emerald-600 mt-1">{metrics.won}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filters and Actions Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#ECE8F2] shadow-xs mb-5 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchLeads()}
              placeholder="ابحث بالاسم، الجوال، أو الرقم المرجعي..."
              className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-[#FAF9FC] border border-[#D5CBE3] text-xs text-[#15101E] focus:outline-none focus:border-[#56138A]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Status Tabs & Export */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#FAF9FC] border border-[#D5CBE3] text-xs font-bold text-[#15101E]"
            >
              <option value="all">جميع الحالات</option>
              <option value="new">الطلبات الجديدة</option>
              <option value="contacted">تم التواصل</option>
              <option value="interested">مهتم</option>
              <option value="won">تم البيع</option>
              <option value="not_interested">غير مهتم</option>
            </select>

            <button
              onClick={exportToCSV}
              disabled={!leads.length}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#14532D] bg-[#DCFCE7] hover:bg-[#BBF7D0] border border-[#86EFAC] transition-colors disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تصدير Excel (CSV)</span>
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl border border-[#ECE8F2] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#FAF9FC] border-b border-[#ECE8F2] text-[#6B7280] font-bold">
                <tr>
                  <th className="p-3.5">الرقم المرجعي</th>
                  <th className="p-3.5">العميل</th>
                  <th className="p-3.5">رقم الجوال</th>
                  <th className="p-3.5">الباقة المطلوبة</th>
                  <th className="p-3.5">الموعد والتواصل</th>
                  <th className="p-3.5">حالة الطلب</th>
                  <th className="p-3.5">التاريخ</th>
                  <th className="p-3.5 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECE8F2]">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-gray-400">
                      {loadingLeads ? "جارٍ تحميل الطلبات..." : "لا توجد طلبات مسجلة حالياً."}
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => {
                    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
                    const whatsappLink = `https://wa.me/966${cleanPhone.startsWith("0") ? cleanPhone.slice(1) : cleanPhone}`;

                    return (
                      <tr key={lead._id} className="hover:bg-[#FAF9FC]/80 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-[#56138A]">
                          {lead.reference}
                        </td>

                        <td className="p-3.5">
                          <p className="font-bold text-[#15101E]">{lead.name}</p>
                          <p className="text-[11px] text-[#6B7280]">{lead.business || "نشاط غير محدد"}</p>
                        </td>

                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-gray-800" dir="ltr">{lead.phone}</span>
                            <a
                              href={`tel:${lead.phone}`}
                              className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-[#56138A]"
                              title="اتصال هاتفي"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={whatsappLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-600"
                              title="محادثة واتساب"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <span className="font-bold text-[#15101E]">{lead.packageName}</span>
                        </td>

                        <td className="p-3.5">
                          <p className="text-gray-700">{lead.timeline}</p>
                          <p className="text-[11px] text-gray-500">عبر: {lead.contactMethod}</p>
                        </td>

                        <td className="p-3.5">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateStatus(lead._id, e.target.value)}
                            className="text-xs font-bold rounded-lg border border-gray-200 bg-white px-2 py-1 focus:outline-none focus:border-[#56138A]"
                          >
                            <option value="new">جديد ⏳</option>
                            <option value="contacted">تم التواصل 📞</option>
                            <option value="interested">مهتم ⭐</option>
                            <option value="won">تم البيع ✅</option>
                            <option value="not_interested">غير مهتم ✕</option>
                          </select>
                        </td>

                        <td className="p-3.5 text-gray-500 whitespace-nowrap">
                          {new Date(lead.createdAt).toLocaleDateString("ar-SA", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>

                        <td className="p-3.5 text-center">
                          <button
                            onClick={() => handleDeleteLead(lead._id, lead.name)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                            title="حذف الطلب"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
