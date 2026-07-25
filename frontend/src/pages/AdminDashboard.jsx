import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { leadService } from '../services/api';
import toast from 'react-hot-toast';
import { LogOut, Users, UserPlus, PhoneCall, CheckCircle, Download } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import LeadTable from '../components/LeadTable';
import LeadDrawer from '../components/LeadDrawer';
import { CSVLink } from 'react-csv';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Drawer state
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchLeads = async () => {
    try {
      const response = await leadService.getLeads();
      setLeads(response.data);
    } catch (error) {
      toast.error('Failed to fetch leads');
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await leadService.updateLead(id, { status: newStatus });
      setLeads(leads.map(lead => lead._id === id ? response.data : lead));
      if (selectedLead && selectedLead._id === id) {
        setSelectedLead(response.data);
      }
      toast.success('Status updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await leadService.deleteLead(id);
      setLeads(leads.filter(lead => lead._id !== id));
      if (selectedLead && selectedLead._id === id) {
        setIsDrawerOpen(false);
        setSelectedLead(null);
      }
      toast.success('Lead deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete lead');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLeadSelect = (lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const handleLeadDrawerUpdate = (updatedLead) => {
    setLeads(leads.map(lead => lead._id === updatedLead._id ? updatedLead : lead));
    setSelectedLead(updatedLead);
  };

  // Calculate Statistics
  const stats = useMemo(() => {
    return {
      total: leads.length,
      new: leads.filter(l => l.status === 'New').length,
      contacted: leads.filter(l => l.status === 'Contacted').length,
      closed: leads.filter(l => l.status === 'Closed').length,
    };
  }, [leads]);

  // Chart Data
  const chartData = [
    { name: 'New', value: stats.new, color: '#3b82f6' }, // blue-500
    { name: 'Contacted', value: stats.contacted, color: '#eab308' }, // yellow-500
    { name: 'Closed', value: stats.closed, color: '#22c55e' }, // green-500
  ].filter(item => item.value > 0);

  // CSV Data Preparation
  const csvHeaders = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Budget', key: 'budget' },
    { label: 'Status', key: 'status' },
    { label: 'Message', key: 'message' },
    { label: 'Date', key: 'createdAt' },
    { label: 'Notes', key: 'notes' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 transition-colors">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors">
      {/* Topbar */}
      <header className="bg-white dark:bg-dark-800 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">LeadDesk Admin</h1>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => navigate('/admin/profile')}
                className="flex items-center text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                title="Admin Profile"
              >
                <div className="hidden sm:flex flex-col items-end mr-3">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white leading-none mb-1">Admin</span>
                  <span className="text-xs text-primary-600 dark:text-primary-400 leading-none">Profile Settings</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center border border-primary-200 dark:border-primary-800">
                  <Users size={16} className="text-primary-600 dark:text-primary-400" />
                </div>
              </button>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut size={20} className="sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
            <p className="text-gray-500 dark:text-gray-400">Manage and track your leads</p>
          </div>
          
          <CSVLink
            data={leads}
            headers={csvHeaders}
            filename={`leads-export-${new Date().toISOString().split('T')[0]}.csv`}
            className="btn-primary"
          >
            <Download size={18} className="mr-2" />
            Export CSV
          </CSVLink>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-white dark:bg-dark-800 border-l-4 border-l-primary-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                <Users size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Leads</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="card bg-white dark:bg-dark-800 border-l-4 border-l-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <UserPlus size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">New Leads</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.new}</p>
              </div>
            </div>
          </div>
          <div className="card bg-white dark:bg-dark-800 border-l-4 border-l-yellow-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                <PhoneCall size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Contacted</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.contacted}</p>
              </div>
            </div>
          </div>
          <div className="card bg-white dark:bg-dark-800 border-l-4 border-l-green-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <CheckCircle size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Closed</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.closed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart and Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="card lg:col-span-1 min-h-[300px] flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 w-full text-left">Lead Status Distribution</h3>
            {chartData.length > 0 ? (
              <div className="w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Not enough data</p>
            )}
          </div>
          
          <div className="lg:col-span-2">
            <LeadTable 
              leads={leads}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDelete}
              isDeleting={isDeleting}
              onSelectLead={handleLeadSelect}
            />
          </div>
        </div>
      </main>

      <LeadDrawer 
        lead={selectedLead}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onUpdate={handleLeadDrawerUpdate}
      />
    </div>
  );
};

export default AdminDashboard;
