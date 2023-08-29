import Globus, {GlobeContextProvider} from './globus.js'
import ButtonContainer from "./button.js";


export default function App() {
    return <GlobeContextProvider>
        <ButtonContainer/>
        <Globus/>
    </GlobeContextProvider>
}
