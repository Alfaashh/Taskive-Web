function Footer() {
  return (
    <footer className="bg-purple-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Android Application
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  iOS Application
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  How Does It Work
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Press Package
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Our Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Contribute to Taskive
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Translate Taskive
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Report Bug
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Submit New Features
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-purple-200">© 2025 Taskive. All Right Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-purple-200 hover:text-white transition-colors">
              Security Policy
            </a>
            <a href="#" className="text-purple-200 hover:text-white transition-colors">
              Terms and Condition
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
