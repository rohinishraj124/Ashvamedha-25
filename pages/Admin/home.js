import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLogin } from '../../context/loginContextProvider';
import Navbar from '../../components/navbar';
// import Loader from '../../components/Loader/Loader';

// --- Confirmation Modal Component ---
const LogoutModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="w-full max-w-sm rounded-lg bg-gray-800 p-6 text-center shadow-2xl">
      <h3 className="text-xl font-bold text-white">Confirm Logout</h3>
      <p className="mt-2 text-gray-300">Are you sure you want to log out?</p>
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={onCancel}
          className="rounded-md bg-gray-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="rounded-md bg-red-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
);


function AdminHome() {
  const loginCtx = useLogin();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true); // Open the modal instead of showing a confirm dialog
  };

  const confirmLogout = () => {
    loginCtx.logout();
    setShowLogoutModal(false); // Close the modal
    router.push("/");
    // You can replace the alert with a more modern toast notification if you have one
    alert("Logged out successfully");
  };
  
  // Base classes for all buttons and links for consistency
  const baseButtonClasses = "block w-full rounded-md bg-warm px-5 py-3 text-center font-bold text-white transition-colors duration-300 hover:bg-warm-hover";

  return (
    <>
      <Navbar />
      <div className='flex min-h-[80vh] w-full items-center justify-center bg-[#1c1c1c] p-4 text-white'>
        {loading ? (
          // <Loader />
          <div>Loading...</div>
        ) : (
          <div className="w-full max-w-md rounded-lg p-8 text-center md:max-w-lg">
            {loginCtx.isLoggedIn ? (
              <div className="flex flex-col items-center gap-y-4">
                <h2 className="text-2xl font-bold">You are Logged In as <span className="text-warm">{loginCtx.sport}</span> Admin</h2>
                <p className="text-gray-300">Note: You can only make changes for {loginCtx.sport}.</p>
                <Link href={`/livescore/${loginCtx.sport}`} className={baseButtonClasses}>
                  See Livescore ({loginCtx.sport})
                </Link>
                <Link href="/setlivescore" className={baseButtonClasses}>
                  Create New Live Score
                </Link>
                <Link href="/updatelivescore" className={baseButtonClasses}>
                  Update Live Score
                </Link>
                <Link href="/updatepointstable" className={baseButtonClasses}>
                  Set Points Table Score
                </Link>
                <button onClick={handleLogout} className={`${baseButtonClasses} mt-4 bg-red-600 hover:bg-red-500`}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-y-4">
                <p className="text-2xl font-bold text-gray-300">You are not logged in.</p>
                <button onClick={() => router.push("/Admin/homeLogin")} className={baseButtonClasses}>
                  Login
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Conditionally render the logout modal */}
      {showLogoutModal && (
        <LogoutModal 
          onConfirm={confirmLogout} 
          onCancel={() => setShowLogoutModal(false)} 
        />
      )}
    </>
  );
}

export default AdminHome;