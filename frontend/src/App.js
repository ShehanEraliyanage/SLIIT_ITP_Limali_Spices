import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';

//Pamo
import RawMaterial from './screens/raw-material-dashboard';
import RawMaterialManage from './screens/raw-materials-manage';
import RawMaterialAdd from './screens/raw-material-add';
import RawMaterialUpdate from './screens/raw-material-edit';
import RawMaterialPurchaseQuotation from './screens/raw-materials-manage-quotations';
import RawMaterialAddQuotation from './screens/raw-material-purchase-quotation';
import raw_materialReport from './screens/raw-material-stock-report';
import raw_materialLogin from './screens/raw-material-login';






//Izi
import Branch from './screens/branch-manage';
import BranchLogin from './screens/branch-login';
import BranchAdd from './screens/branch-add';
import BranchUpdate from './screens/branch-update';
import BranchEmployee from './screens/branch-manage-employees';
import BranchReport from './screens/branch-report';
import BranchRawMaterial from './screens/branch-raw-material';
import BranchOrders from './screens/branch-manage-orders';




//Hirusha
import Home from './screens/Home';
import Vehicle from './screens/Vehicle-add';
import VehicleList from './screens/Vehicle-list';
import VehicleEdit from './screens/Vehicle-edit';
import Order from './screens/Order';
import Report from './screens/Report';

import NewProduct from './pages/NewProduct';
import ProductDashboard from './pages/ProductDashboard';
import ViewProduct from './pages/ViewProduct';
import EditProduct from './pages/EditProduct'
import ViewProducts from './pages/ViewProducts';
import ProductionReports from './pages/ProductionReports';

//Pasindu

import SupplierDashboard from './components/SupplierDashboard'
import SupplierRequests from './components/SupplierRequests'
import SupplierQuotations from './components/SupplierQuotations'
import ViewSuppliers from './components/ViewSuppliers'
import SearchSuppliers from './components/SearchSuppliers'
import SupplierReports from './components/SupplierReports'
import PurchaseQuotations from './components/PurchaseQuotations'
import SupplierSalesHistory from './components/SupplierSalesHistory'
import printPage from './components/printPage'

//Thanu

import CustomerManagerHome from './pages/CustomerManagerHome';
import ManageCustomer from './pages/ManageCustomer';
import ManageOrder from './pages/ManageOrder';
import EnrollCustomer from './pages/EnrollCustomer';
import UpdateCustomer from './pages/UpdateCustomer';
import CustomerOrderReport from './pages/CustomerOrderReport';


//Inuri
import CustomerInquiry from './pages/CustomerInquiry';
import SupplierInquiry from './pages/SupplierInquiry';
import UpdateCustomerInquiry from './pages/UpdateCustomerInquiry';


//Shehan
import EmployeeHome from './pages/EmployeeHome'
import AddEmployee from './pages/AddEmployee';
import ViewEmployee from './pages/ViewEmployee';
import UpdateEmployee from './pages/UpdateEmployee';
import ManageLeaves from './pages/ManageLeaves';
import SalaryDetails from './pages/SalaryDetails';
import EmployeeReport from './pages/EmployeeReport';


function App() {
  return (
    <BrowserRouter>
    <Switch>
      {/* Pamo */}
      <Route exact path="/raw-material-add" component={RawMaterialAdd}/>
      <Route exact path="/raw-material-manage" component={RawMaterialManage}/>
      <Route exact path="/raw-material-dashboard" component={RawMaterial}/>
      <Route exact path="/raw-material-update/:id" component={RawMaterialUpdate}/>
      <Route exact path="/raw-purchase-quotation" component={RawMaterialPurchaseQuotation}/>
      <Route exact path="/raw-add-quotation" component={RawMaterialAddQuotation}/>
      <Route exact path="/raw-login" component={raw_materialLogin}/>
      <Route exact path="/raw-report" component={raw_materialReport}/>




      {/* Izi */}
      <Route exact path="/add-branch" component={BranchAdd}/>
      <Route exact path="/branch-login" component={BranchLogin}/>
      <Route exact path="/branch-dash" component={Branch}/>
      <Route exact path="/branch-employees" component={BranchEmployee}/>
      <Route exact path="/branch-update/:id" component={BranchUpdate}/>
      <Route exact path="/branch-report" component={BranchReport}/>
      <Route exact path="/branch-raw-material" component={BranchRawMaterial}/>
      <Route exact path="/branch-orders" component={BranchOrders}/>







      {/* Hirusha */}
      <Route exact path="/" component={Home}/>
      <Route exact path="/vehicle-add" component={Vehicle}/>
      <Route exact path="/vehicle-list" component={VehicleList}/>
      <Route exact path="/vehicle-edit/:id" component={VehicleEdit}/>
      <Route exact path="/order" component={Order}/>
      <Route exact path="/report" component={Report}/>
      
      <Route exact path="/productHome" component={ProductDashboard} />
      <Route exact path="/viewProducts" component={ViewProducts } />
      <Route exact path="/viewProduct/:id" component={ViewProduct } />
      <Route exact path="/editProduct/:id" component={EditProduct } />
      <Route exact path="/newProduct" component={NewProduct } />
      <Route exact path="/productionReports" component={ProductionReports} />

      {/* Pasindu */}
      <Route exact path="/SupplierDashboard" component={SupplierDashboard}/>
      <Route exact path="/SupplierRequests" component={SupplierRequests}/>
      <Route exact path="/SupplierQuotations" component={SupplierQuotations}/>
      <Route exact path="/ViewSuppliers" component={ViewSuppliers}/>
      <Route exact path="/SupplierReports" component={SupplierReports}/>
      <Route exact path="/PurchaseQuotations" component={PurchaseQuotations}/>
      <Route exact path="/SupplierSalesHistory" component={SupplierSalesHistory}/>
      <Route exact path="/SearchSuppliers/:id" component={SearchSuppliers}/>
      <Route exact path="/printPage" component={printPage}/>

      {/* Thanu */}
      <Route exact path="/CustomerManagerHome" component={CustomerManagerHome}/>
      <Route exact path="/ManageCustomer" component={ManageCustomer}/>
      <Route exact path="/ManageOrder" component={ManageOrder}/>
      <Route exact path="/EnrollCustomer" component={EnrollCustomer}/>
      <Route exact path="/UpdateCustomer/:id" component={UpdateCustomer}/>
      <Route exact path="/CustomerOrderReport" component={CustomerOrderReport}/>

       {/* Inu */}

       <Route exact path="/CustomerInquiry" component={CustomerInquiry}/>
       <Route exact path="/SupplierInquiry" component={SupplierInquiry}/>
       <Route exact path ="/CustomerInquiry/update/:id" component={UpdateCustomerInquiry}/>

       {/* Shehan */}

       <Route exact path="/EmployeeHome" component={EmployeeHome}/>
       <Route exact path="/AddEmployee" component={AddEmployee}/>
       <Route exact path="/ViewEmployee" component={ViewEmployee}/>
       <Route exact path="/UpdateEmployee/:id" component={UpdateEmployee}/>
       <Route exact path="/ManageLeaves" component={ManageLeaves}/>
       <Route exact path="/SalaryDetails" component={SalaryDetails}/>
       <Route exact path="/EmployeeReport" component={EmployeeReport}/>

    </Switch>
  </BrowserRouter>
  );
};

export default App;

