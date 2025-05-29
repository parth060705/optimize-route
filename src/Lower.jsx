const Lower = () => {
  return (
    <footer className="bg-white border border-white py-10 px-6 md:px-16 mt-4 text-black">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-2">About</h4>
          <p className="text-sm text-black">
            RouteOptimization helps users manage their tasks efficiently and collaborate in real time.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Contact</h4>
          <p className="text-sm text-black">Email: support@RouteOptimization.com</p>
          <p className="text-sm text-black">Phone: +1 (555) 123-4567</p>
        </div>
      </div>
      <div className="text-center text-xs text-black mt-6">
        &copy; {new Date().getFullYear()} RouteOptimization. All rights reserved.
      </div>
    </footer>
  );
};

export default Lower;
