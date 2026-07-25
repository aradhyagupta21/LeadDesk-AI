import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, DollarSign, Mail, Save } from 'lucide-react';
import { leadService } from '../services/api';
import toast from 'react-hot-toast';

const LeadDrawer = ({ lead, isOpen, onClose, onUpdate }) => {
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (lead) {
      setNotes(lead.notes || '');
    }
  }, [lead]);

  const handleSaveNotes = async () => {
    if (!lead) return;
    setIsSaving(true);
    try {
      const response = await leadService.updateLead(lead._id, { notes });
      onUpdate(response.data);
      toast.success('Notes saved successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save notes');
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Closed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-dark-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Lead Details</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        {lead && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Header Info */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{lead.name}</h3>
                <span className={`text-xs font-semibold rounded-full px-3 py-1 ${getStatusColor(lead.status)}`}>
                  {lead.status}
                </span>
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail size={18} className="mr-3 text-primary-500" />
                <a href={`mailto:${lead.email}`} className="hover:text-primary-600 hover:underline">{lead.email}</a>
              </div>
              {lead.phone && (
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="flex items-center">
                    <svg className="w-[18px] h-[18px] mr-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </span>
                  <span>{lead.phone}</span>
                </div>
              )}
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <DollarSign size={18} className="mr-3 text-primary-500" />
                <span>Budget: {lead.budget}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                <Calendar size={18} className="mr-3 text-gray-400" />
                <span>Created: {formatDate(lead.createdAt)}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                <Clock size={18} className="mr-3 text-gray-400" />
                <span>Last Updated: {formatDate(lead.updatedAt)}</span>
              </div>
            </div>

            {lead.requirements && lead.requirements.length > 0 && (
              <>
                <hr className="border-gray-100 dark:border-gray-700" />
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Requirements</h4>
                  <div className="flex flex-wrap gap-2">
                    {lead.requirements.map(req => (
                      <span key={req} className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}

            <hr className="border-gray-100 dark:border-gray-700" />

            {/* Message */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Message</h4>
              <div className="bg-gray-50 dark:bg-dark-900 rounded-lg p-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap border border-gray-100 dark:border-gray-800">
                {lead.message}
              </div>
            </div>

            {/* Notes Section */}
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Internal Notes</h4>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this lead here..."
                className="input-field resize-y min-h-[120px] text-sm"
              ></textarea>
              <button 
                onClick={handleSaveNotes}
                disabled={isSaving || notes === (lead.notes || '')}
                className="mt-3 btn-primary w-full py-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSaving ? (
                  'Saving...'
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Save Notes
                  </>
                )}
              </button>
            </div>
            
          </div>
        )}
      </div>
    </>
  );
};

export default LeadDrawer;
