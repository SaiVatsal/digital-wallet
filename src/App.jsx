import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  QrCode,
  Receipt,
  Shield,
  Zap,
  TrendingUp,
  Lock,
  Unlock,
  CheckCircle2,
  Plus,
  Send,
  Eye,
  EyeOff,
  Bell,
  RefreshCw,
  Sparkles,
  Smartphone,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    walletBalance,
    savingsVaultBalance,
    monthlySpendLimit,
    cards,
    recentContacts,
    transactions,
    bills,
    sendP2PTransfer,
    toggleCardFreeze,
    payBill,
    depositFunds
  } = useStore();

  // Send state
  const [sendHandle, setSendHandle] = useState('@julian.vance');
  const [sendAmount, setSendAmount] = useState('50');
  const [sendNote, setSendNote] = useState('Dinner split & drinks');
  const [sendSuccess, setSendSuccess] = useState(false);

  // Top up state
  const [topUpModal, setTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('500');

  // Request state
  const [reqAmount, setReqAmount] = useState('75');

  // Card view state
  const [showCvv, setShowCvv] = useState(false);

  const handleSendSubmit = (e) => {
    e.preventDefault();
    if (!sendHandle || !sendAmount) return;
    sendP2PTransfer(sendHandle, sendAmount, sendNote);
    setSendSuccess(true);
    setTimeout(() => {
      setSendSuccess(false);
    }, 1800);
  };

  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    depositFunds(topUpAmount);
    setTopUpModal(false);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#121215]/90 backdrop-blur-md border-b border-zinc-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab('wallet')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-black font-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6 fill-black" />
              </div>
              <div>
                <span className="text-2xl font-mono font-extrabold tracking-tight text-white flex items-center gap-1">
                  VOLT<span className="text-emerald-400">PAY</span>
                </span>
                <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  DECENTRALIZED DIGITAL WALLET
                </span>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {[
                { id: 'wallet', label: 'Wallet & Activity', icon: Wallet },
                { id: 'send', label: 'Send P2P', icon: ArrowUpRight },
                { id: 'request', label: 'Receive QR', icon: QrCode },
                { id: 'cards', label: 'Virtual Cards', icon: CreditCard },
                { id: 'bills', label: 'Bill Pay', icon: Receipt },
                { id: 'analytics', label: 'Spend Limits', icon: TrendingUp }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-zinc-800 text-emerald-400 border border-emerald-500/30'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTopUpModal(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition active:scale-95 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Cash
            </button>
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs font-mono text-zinc-300">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>FDIC Insured</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ================= TAB 1: WALLET HOME ================= */}
        {activeTab === 'wallet' && (
          <div className="space-y-8">
            {/* Balance Card Hero */}
            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-8 bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-[#0a1f14] rounded-3xl p-8 border border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                      Total Liquid Available Balance
                    </span>
                    <div className="text-4xl sm:text-6xl font-mono font-extrabold text-white mt-2 tracking-tight">
                      ${walletBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mt-2">
                      <TrendingUp className="w-4 h-4" /> +$3,450.00 this week (4.8% APY yield active)
                    </div>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono px-3.5 py-1.5 rounded-full font-bold">
                    Primary Checking
                  </div>
                </div>

                {/* Quick Action Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-zinc-800">
                  <button
                    onClick={() => setActiveTab('send')}
                    className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-2xl border border-zinc-700 text-left transition space-y-2 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-white">Send P2P</div>
                      <div className="text-[10px] text-zinc-400">Zero fee instant</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('request')}
                    className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-2xl border border-zinc-700 text-left transition space-y-2 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowDownLeft className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-white">Receive QR</div>
                      <div className="text-[10px] text-zinc-400">Scan & payment code</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setTopUpModal(true)}
                    className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-2xl border border-zinc-700 text-left transition space-y-2 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-white">Deposit</div>
                      <div className="text-[10px] text-zinc-400">FedNow wire</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('cards')}
                    className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-2xl border border-zinc-700 text-left transition space-y-2 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-white">Virtual Cards</div>
                      <div className="text-[10px] text-zinc-400">2 active cards</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Side Savings & Card preview */}
              <div className="lg:col-span-4 bg-zinc-900 rounded-3xl p-6 border border-zinc-800 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-zinc-400 uppercase">
                      Vault Savings (5.2% APY)
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">Auto-Save</span>
                  </div>
                  <div className="text-3xl font-mono font-bold text-white">
                    ${savingsVaultBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full w-3/4" />
                  </div>
                  <p className="text-xs text-zinc-400 font-mono">
                    Target: $20,000.00 · $4,800.00 remaining
                  </p>
                </div>

                <div className="bg-gradient-to-tr from-zinc-950 to-zinc-800 p-5 rounded-2xl border border-zinc-700 space-y-4 relative">
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
                    <span>{cards[0].type}</span>
                    <span className="text-emerald-400 font-bold">{cards[0].network}</span>
                  </div>
                  <div className="font-mono text-lg tracking-widest text-zinc-200">
                    •••• •••• •••• {cards[0].last4}
                  </div>
                  <div className="flex justify-between text-xs font-mono text-zinc-400">
                    <span>EXP {cards[0].expiry}</span>
                    <span>{cards[0].holder}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contacts Rail */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
                Instant Transfer to Contacts
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {recentContacts.map((cnt) => (
                  <div
                    key={cnt.id}
                    onClick={() => {
                      setSendHandle(cnt.handle);
                      setActiveTab('send');
                    }}
                    className="bg-zinc-900 hover:bg-zinc-800/80 p-4 rounded-2xl border border-zinc-800 flex items-center gap-3 cursor-pointer transition"
                  >
                    <img
                      src={cnt.avatar}
                      alt={cnt.name}
                      className="w-11 h-11 rounded-full object-cover border border-emerald-500/40"
                    />
                    <div className="truncate">
                      <div className="text-xs font-bold text-white truncate">{cnt.name}</div>
                      <div className="text-[11px] font-mono text-emerald-400">{cnt.handle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction Stream */}
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-xl space-y-4 p-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <h3 className="font-mono font-bold text-lg text-white">Transaction Stream</h3>
                <span className="text-xs font-mono text-zinc-400">Live FedNow & Card Settlement</span>
              </div>

              <div className="divide-y divide-zinc-800/60">
                {transactions.map((txn) => (
                  <div
                    key={txn.id}
                    className="py-4 flex items-center justify-between hover:bg-zinc-800/30 px-2 rounded-xl transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xl">
                        {txn.icon}
                      </div>
                      <div>
                        <div className="font-mono font-bold text-sm text-white">{txn.title}</div>
                        <div className="text-xs text-zinc-400 font-mono">
                          {txn.date} · {txn.category}
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div
                        className={`text-base font-bold ${
                          txn.amount > 0 ? 'text-emerald-400' : 'text-zinc-200'
                        }`}
                      >
                        {txn.amount > 0 ? '+' : ''}
                        ${Math.abs(txn.amount).toFixed(2)}
                      </div>
                      <div className="text-[11px] text-zinc-500">{txn.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: SEND P2P ================= */}
        {activeTab === 'send' && (
          <div className="max-w-xl mx-auto bg-zinc-900 rounded-3xl p-8 border border-zinc-800 shadow-2xl space-y-6">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                Instant P2P Network
              </span>
              <h2 className="text-2xl font-mono font-bold text-white mt-1">
                Send Money by @Cashtag
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Instant delivery to any VoltPay handle or phone number with zero network fees.
              </p>
            </div>

            {sendSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-xl font-mono font-bold text-white">Transfer Delivered!</h3>
                <p className="text-xs text-zinc-400">
                  ${sendAmount} was sent directly to {sendHandle}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Recipient @Cashtag / Email
                  </label>
                  <input
                    type="text"
                    required
                    value={sendHandle}
                    onChange={(e) => setSendHandle(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max={walletBalance}
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 font-mono text-2xl font-bold text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <div className="flex gap-2 mt-2">
                    {[10, 25, 50, 100, 250].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setSendAmount(String(amt))}
                        className="flex-1 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 transition"
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Note / Emoji Tag
                  </label>
                  <input
                    type="text"
                    value={sendNote}
                    onChange={(e) => setSendNote(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 font-mono text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-sm py-3.5 rounded-xl shadow-lg transition active:scale-95"
                  >
                    Confirm & Send ${sendAmount}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ================= TAB 3: RECEIVE QR ================= */}
        {activeTab === 'request' && (
          <div className="max-w-md mx-auto bg-zinc-900 rounded-3xl p-8 border border-zinc-800 shadow-2xl space-y-6 text-center">
            <h2 className="text-2xl font-mono font-bold text-white">Scan to Pay Me</h2>
            <p className="text-xs text-zinc-400">
              Present this QR code in-person or share your payment invoice link.
            </p>

            <div className="bg-white p-6 rounded-3xl inline-block shadow-2xl">
              <QrCode className="w-48 h-48 text-black mx-auto" />
              <div className="text-black font-mono font-bold text-xs mt-2">
                @alexandra.w · ${reqAmount}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-zinc-400 uppercase">
                Custom Request Amount ($)
              </label>
              <input
                type="number"
                value={reqAmount}
                onChange={(e) => setReqAmount(e.target.value)}
                className="w-40 mx-auto bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 font-mono text-lg font-bold text-center text-emerald-400"
              />
            </div>
          </div>
        )}

        {/* ================= TAB 4: VIRTUAL CARDS ================= */}
        {activeTab === 'cards' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-mono font-bold text-white">Virtual & Physical Cards</h2>
                <p className="text-xs text-zinc-400">
                  Instant card freeze, dynamic CVV, and contactless transaction limits.
                </p>
              </div>
              <button
                onClick={() => setShowCvv(!showCvv)}
                className="bg-zinc-800 hover:bg-zinc-700 text-xs font-mono px-4 py-2 rounded-xl text-zinc-300 flex items-center gap-2"
              >
                {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showCvv ? 'Hide CVV' : 'Reveal CVV'}
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {cards.map((c) => (
                <div
                  key={c.id}
                  className={`rounded-3xl p-6 border ${
                    c.frozen ? 'border-red-500/40 bg-zinc-950/90 opacity-70' : 'border-zinc-700 bg-gradient-to-br from-zinc-900 to-zinc-950'
                  } shadow-2xl space-y-6`}
                >
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400">{c.type}</span>
                    <span className="text-emerald-400 font-bold">{c.network}</span>
                  </div>

                  <div className="font-mono text-xl tracking-widest text-zinc-100">
                    •••• •••• •••• {c.last4}
                  </div>

                  <div className="flex justify-between items-end text-xs font-mono">
                    <div>
                      <span className="text-zinc-500 block text-[10px]">CARD HOLDER</span>
                      <span className="text-white font-bold">{c.holder}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">EXPIRES</span>
                      <span className="text-white font-bold">{c.expiry}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">CVV</span>
                      <span className="text-emerald-400 font-bold font-mono">
                        {showCvv ? '824' : '•••'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex justify-between items-center">
                    <button
                      onClick={() => toggleCardFreeze(c.id)}
                      className={`text-xs font-mono font-bold px-4 py-2 rounded-xl transition ${
                        c.frozen
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                      }`}
                    >
                      {c.frozen ? '❄️ Card Frozen' : 'Freeze Card'}
                    </button>
                    <span className="text-[11px] font-mono text-zinc-400">Contactless Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: BILL PAY ================= */}
        {activeTab === 'bills' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-mono font-bold text-white">Scheduled Bill Pay</h2>

            <div className="space-y-4">
              {bills.map((b) => (
                <div
                  key={b.id}
                  className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h3 className="font-mono font-bold text-base text-white">{b.provider}</h3>
                    <div className="text-xs text-zinc-400 font-mono">
                      Category: {b.category} · Due by {b.dueDate}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xl font-mono font-bold text-white">
                      ${b.amount.toFixed(2)}
                    </span>
                    {b.status === 'Paid' ? (
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs font-mono px-3 py-1 rounded-full font-bold">
                        Paid ✓
                      </span>
                    ) : (
                      <button
                        onClick={() => payBill(b.id)}
                        className="bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs px-4 py-2 rounded-xl transition"
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: ANALYTICS ================= */}
        {activeTab === 'analytics' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl font-mono font-bold text-white">Monthly Spend & Budget</h2>

            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase">
                    Monthly Budget Target
                  </span>
                  <div className="text-3xl font-mono font-bold text-white mt-1">
                    $1,482.75 / ${monthlySpendLimit.toFixed(2)}
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-mono px-3 py-1 rounded-full">
                  Under Budget
                </span>
              </div>

              <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
                <div className="bg-emerald-500 h-3 rounded-full w-[30%]" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-zinc-800 text-center font-mono">
                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                  <div className="text-xs text-zinc-400">Tech & Hardware</div>
                  <div className="text-lg font-bold text-white mt-1">$249.00</div>
                </div>
                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                  <div className="text-xs text-zinc-400">Dining & Cafe</div>
                  <div className="text-lg font-bold text-white mt-1">$158.75</div>
                </div>
                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                  <div className="text-xs text-zinc-400">Utilities</div>
                  <div className="text-lg font-bold text-white mt-1">$244.20</div>
                </div>
                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                  <div className="text-xs text-zinc-400">Health</div>
                  <div className="text-lg font-bold text-white mt-1">$180.00</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================= TOP UP MODAL ================= */}
      {topUpModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-3xl max-w-md w-full p-8 border border-zinc-800 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <h3 className="font-mono font-bold text-lg text-white">Instant ACH / FedNow Deposit</h3>
              <button onClick={() => setTopUpModal(false)} className="text-zinc-400 hover:text-white">
                ✕
              </button>
            </div>
            <form onSubmit={handleTopUpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Deposit Amount ($)
                </label>
                <input
                  type="number"
                  required
                  min="10"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 font-mono text-2xl font-bold text-emerald-400 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-sm py-3.5 rounded-xl shadow-lg transition"
              >
                Deposit Funds
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto bg-zinc-950 text-zinc-500 py-8 border-t border-zinc-900 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-bold">VOLTPAY DIGITAL WALLET</span> · Project 56 / 59
          </div>
          <div>Port 3056 · Monospace Balance & Instant P2P Settlement</div>
        </div>
      </footer>
    </div>
  );
}
