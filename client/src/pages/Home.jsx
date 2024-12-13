import React from "react";

const Home = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Component */}
      {/* <div className="w-64 bg-blue-900 text-white">
        <div className="p-6">
          <h2 className="text-xl font-bold">EcoGigs</h2>
          <nav className="mt-8">
            <ul>
              <li className="mb-4">
                <a href="/" className="text-white hover:text-gray-200">Home</a>
              </li>
              <li className="mb-4">
                <a href="/gigs" className="text-white hover:text-gray-200">Gigs</a>
              </li>
              <li className="mb-4">
                <a href="/about" className="text-white hover:text-gray-200">About Us</a>
              </li>
              <li className="mb-4">
                <a href="/contact" className="text-white hover:text-gray-200">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </div> */}

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white rounded-lg shadow-xl mb-8 p-10">
          <h1 className="text-4xl font-bold">Welcome to CleanIT</h1>
          {/* <p className="text-xl mt-4">Your platform to make a difference in waste management.</p> */}
          <p className="text-xl mt-4 text-white">
            A gig-based platform for eco-conscious individuals. 
            <br/>Earn money, and make a positive impact on the
            environment.
          </p>
        </section>

        {/* White Space Area with Structure */}
        <section className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">
              Featured Gigs
            </h2>
            <p className="text-gray-600 mt-2">
              Explore the latest waste pickup gigs in your area.
            </p>
            {/* Example Cards or Gig Listings */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">Gig 1</h3>
                <p className="text-gray-600">
                  Waste collection in downtown area.
                </p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Bid for this Gig
                </button>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">Gig 2</h3>
                <p className="text-gray-600">
                  Cleaning up residential neighborhood.
                </p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Bid for this Gig
                </button>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">Gig 3</h3>
                <p className="text-gray-600">Recycling event in the park.</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Bid for this Gig
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">
              EcoHeroes Impact
            </h2>
            <p className="text-gray-600 mt-2">
              See how EcoHeroes are making a difference in waste management.
            </p>
            {/* Example impact stats */}
            <div className="mt-4 flex flex-wrap gap-6">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full sm:w-1/3">
                <h3 className="text-lg font-semibold text-gray-800">500</h3>
                <p className="text-gray-600">Waste pickups completed</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full sm:w-1/3">
                <h3 className="text-lg font-semibold text-gray-800">250</h3>
                <p className="text-gray-600">EcoHeroes working</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full sm:w-1/3">
                <h3 className="text-lg font-semibold text-gray-800">
                  1,000 lbs
                </h3>
                <p className="text-gray-600">Waste recycled</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-500">
          <p>© 2024 EcoGigs. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
