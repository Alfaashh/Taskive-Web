export function Footer() {
  return (
    <footer className="gradient-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors">
                  Android Application
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors">
                  iOS Application
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors">
                  How Does It Work
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors">
                  Press Package
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors">
                  Our Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors">
                  Contribute to Taskive
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors">
                  Translate Taskive
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors">
                  Report Bug
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition-colors">
                  Submit New Features
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 Taskive. All Right Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-purple-300 transition-colors">
              Security Policy
            </a>
            <a href="#" className="hover:text-purple-300 transition-colors">
              Terms and Condition
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
