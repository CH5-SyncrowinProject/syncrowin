import { combineReducers } from "redux";
import { loginReducer } from "../layouts/authentication/sign-in/reducer";
import { signupReducer } from "../layouts/authentication/sign-up/reducer";
import { passwordResetReducer } from "../layouts/authentication/forget-password/reducer";
import { profileReducer } from "layouts/profile/reducer";
import { editProfileReducer } from "layouts/EditProfile/reducer";
import { addAssetReducer, addOperationalInfoReducer, addSupportContactReducer, addEventReducer, addMaintenanceReducer } from "../layouts/library/Component/AddLibrary/reducer";
import { assetDetailReducer } from "layouts/library/reducer";
import { clientManagementReducer } from "layouts/ClientManagement/reducer";
import { addDataReducer } from "layouts/Datasource/reducer";

const rootReducer = combineReducers({
  login: loginReducer,
  signUp: signupReducer,
  passwordReset: passwordResetReducer,
  profile: profileReducer,
  editProfile: editProfileReducer,
  addAsset: addAssetReducer,
  addOperationalInfo: addOperationalInfoReducer,
  addSupportContact: addSupportContactReducer,
  addEvent: addEventReducer,
  addmaintenance: addMaintenanceReducer,
  assetDetail: assetDetailReducer,
  clientManagement: clientManagementReducer, // add client management reducer
  addData: addDataReducer, //datasource
});

export default rootReducer;



