
import { render } from "@testing-library/react-native";
import CurrencySelector from "../components/CurrencySelector";

const onClose = jest.fn()
const onSelect = jest.fn()

describe("currency selector", ()=>{
    test("renders correctly",()=>{
        const currencySelector = render(<CurrencySelector visible={true} onClose={onClose} onSelect={onSelect}/>)
        expect(currencySelector).toBeTruthy()
    })
})