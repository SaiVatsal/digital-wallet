import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'wallet', // 'wallet' | 'send' | 'request' | 'cards' | 'bills' | 'analytics'
  walletBalance: 8425.50,
  savingsVaultBalance: 15200.00,
  monthlySpendLimit: 5000.00,
  biometricLocked: false,
  pinCode: '1337',

  cards: [
    {
      id: 'CRD-01',
      type: 'Volt Black Metal',
      last4: '8842',
      expiry: '09/29',
      holder: 'ALEXANDRA WRIGHT',
      network: 'VISA INFINITE',
      status: 'Active',
      color: 'from-zinc-900 via-zinc-800 to-black',
      contactless: true,
      frozen: false
    },
    {
      id: 'CRD-02',
      type: 'Volt Cyber Virtual',
      last4: '1904',
      expiry: '12/28',
      holder: 'ALEXANDRA WRIGHT',
      network: 'MASTERCARD WORLD',
      status: 'Active',
      color: 'from-emerald-950 via-zinc-900 to-black',
      contactless: true,
      frozen: false
    }
  ],

  recentContacts: [
    { id: 'CNT-01', name: 'Julian Vance', handle: '@julian.vance', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', lastPaid: '$45.00' },
    { id: 'CNT-02', name: 'Elena Rostova', handle: '@elena.r', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80', lastPaid: '$120.00' },
    { id: 'CNT-03', name: 'Marcus Holloway', handle: '@marcus.h', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80', lastPaid: '$80.00' },
    { id: 'CNT-04', name: 'Clara Zimmerman', handle: '@clara.z', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', lastPaid: '$14.50' }
  ],

  transactions: [
    {
      id: 'TXN-9021',
      title: 'Neural Optics Lab Inc.',
      category: 'Tech & Gadgets',
      amount: -249.00,
      date: 'Today · 14:20',
      type: 'Debit',
      icon: '🛍️',
      status: 'Completed',
      fee: 0.00,
      note: 'Lumina AR Pre-order'
    },
    {
      id: 'TXN-9020',
      title: 'Stripe Payout: Research Grant',
      category: 'Income',
      amount: 3450.00,
      date: 'Yesterday · 09:15',
      type: 'Credit',
      icon: '💰',
      status: 'Completed',
      fee: 0.00,
      note: 'Acta Scientia Fellowship'
    },
    {
      id: 'TXN-9019',
      title: 'Coffee & Roastery Blue Bottle',
      category: 'Dining',
      amount: -8.75,
      date: 'Sep 25 · 08:30',
      type: 'Debit',
      icon: '☕',
      status: 'Completed',
      fee: 0.00,
      note: 'Morning pour-over'
    },
    {
      id: 'TXN-9018',
      title: 'Transfer to @julian.vance',
      category: 'P2P Transfer',
      amount: -45.00,
      date: 'Sep 24 · 19:40',
      type: 'Debit',
      icon: '⚡',
      status: 'Completed',
      fee: 0.00,
      note: 'Dinner split'
    },
    {
      id: 'TXN-9017',
      title: 'Equinox Fitness Club',
      category: 'Health & Wellness',
      amount: -180.00,
      date: 'Sep 21 · 11:00',
      type: 'Debit',
      icon: '🏋️',
      status: 'Completed',
      fee: 0.00,
      note: 'Monthly membership'
    }
  ],

  bills: [
    { id: 'BIL-01', provider: 'ConEdison Electric Grid', category: 'Utilities', amount: 145.20, dueDate: 'Oct 04, 2026', status: 'Pending', autoPay: true },
    { id: 'BIL-02', provider: 'Starlink Broadband Ultra', category: 'Internet', amount: 99.00, dueDate: 'Oct 10, 2026', status: 'Pending', autoPay: true },
    { id: 'BIL-03', provider: 'Metro Transit Monthly Pass', category: 'Transportation', amount: 125.00, dueDate: 'Oct 15, 2026', status: 'Paid', autoPay: false }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),

  sendP2PTransfer: (recipientHandle, amount, note) => set((state) => {
    const numAmount = Number(amount);
    if (numAmount <= 0 || numAmount > state.walletBalance) return state;

    const newTxn = {
      id: `TXN-${Math.floor(9022 + Math.random() * 900)}`,
      title: `Transfer to ${recipientHandle}`,
      category: 'P2P Transfer',
      amount: -numAmount,
      date: 'Just now',
      type: 'Debit',
      icon: '⚡',
      status: 'Completed',
      fee: 0.00,
      note: note || 'P2P Instant Transfer'
    };

    return {
      walletBalance: state.walletBalance - numAmount,
      transactions: [newTxn, ...state.transactions],
      activeTab: 'wallet'
    };
  }),

  requestFunds: (senderHandle, amount, note) => set((state) => ({
    // simulated request notification
    activeTab: 'wallet'
  })),

  toggleCardFreeze: (cardId) => set((state) => ({
    cards: state.cards.map(c => c.id === cardId ? { ...c, frozen: !c.frozen } : c)
  })),

  payBill: (billId) => set((state) => {
    const targetBill = state.bills.find(b => b.id === billId);
    if (!targetBill || targetBill.status === 'Paid') return state;

    const newTxn = {
      id: `TXN-${Math.floor(9022 + Math.random() * 900)}`,
      title: `Bill Pay: ${targetBill.provider}`,
      category: targetBill.category,
      amount: -targetBill.amount,
      date: 'Just now',
      type: 'Debit',
      icon: '🧾',
      status: 'Completed',
      fee: 0.00,
      note: 'Automated Bill Pay'
    };

    return {
      walletBalance: state.walletBalance - targetBill.amount,
      bills: state.bills.map(b => b.id === billId ? { ...b, status: 'Paid' } : b),
      transactions: [newTxn, ...state.transactions]
    };
  }),

  depositFunds: (amount) => set((state) => {
    const num = Number(amount);
    const newTxn = {
      id: `TXN-${Math.floor(9022 + Math.random() * 900)}`,
      title: 'Instant Bank Deposit (FedNow)',
      category: 'Deposit',
      amount: num,
      date: 'Just now',
      type: 'Credit',
      icon: '🏦',
      status: 'Completed',
      fee: 0.00,
      note: 'Direct ACH / Wire Top-up'
    };

    return {
      walletBalance: state.walletBalance + num,
      transactions: [newTxn, ...state.transactions]
    };
  })
}));
