import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from '../pages/LoginScreen';
import RedirectScreen from '../pages/RedirectScreen';
import NfcScreen from '../pages/NfcScreen';
import FinalScreen from '../pages/FinalScreen';
import CpfInputScreen from '../pages/CpfInputScreen';
import MaintenanceScreen from '../pages/MaintenanceScreen'

<Route path="/nfcscreen" element={<NfcScreen />} />

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/loginpromotor" element={<LoginScreen />} />      
      <Route path="/" element={<LoginScreen />} />      
      <Route path="/redirectscreen" element={<RedirectScreen />} />
      <Route path="/nfcscreen" element={<NfcScreen />} />
      <Route path="/finalscreen" element={<FinalScreen />} />
      <Route path="/cpfinputscreen" element={<CpfInputScreen />} />
      <Route path="/maintenance" element={<MaintenanceScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
