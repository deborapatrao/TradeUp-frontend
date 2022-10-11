// import Main from "./Main";
import "./src/config/firebase-config"
import RootNavigation from "./src/navigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";

export default function App() {
    return (
        <Provider store={store}>
            <RootNavigation />
        </Provider>
    );
}