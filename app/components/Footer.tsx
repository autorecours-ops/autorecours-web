export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-success-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold">AutoRecours</span>
            </div>
            
            <p className="text-navy-300 mb-6 max-w-md">
              Service gratuit de contestation FPS. Payez 19€ uniquement si nous gagnons votre dossier. 
              Simple, rapide et sans engagement.
            </p>
            
            <div className="space-y-2 text-sm text-navy-300">
              <p>AutoRecours SAS - SIRET: 123 456 789 00000</p>
              <p>10 rue de la République, 75001 Paris</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-navy-300">
              <li>Contestation FPS</li>
              <li>Recours administratif</li>
              <li>Suivi de dossier</li>
              <li>Conseil juridique</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Légal</h3>
            <ul className="space-y-2 text-navy-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  RGPD
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-navy-800 mt-8 pt-8 text-center text-navy-300">
          <p>&copy; 2024 AutoRecours. Tous droits réservés. | Service gratuit de contestation FPS</p>
        </div>
      </div>
    </footer>
  )
}