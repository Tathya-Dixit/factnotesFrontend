import { useSelector, useDispatch } from "react-redux"
import { AddState, SubState } from "../redux/action"

const Homered = () => {
    const selector = useSelector((state) => state.TrainingProject)
    const dispatch = useDispatch()
    console.log(selector)
    return (
        <div>
            <div>
                <h1 className="text-white text-center text-5xl font-play mt-6"   >{selector?.state}</h1>
                <div className="flex justify-center">
                    <button className="bg-gray-400 p-4 rounded-xl m-4" onClick={() => dispatch(AddState())}>Add</button>
                    <button className="bg-gray-400 p-4 rounded-xl m-4" onClick={() => dispatch(SubState())}>Subtract</button>
                </div>
            </div>
        </div>
    )
}

export default Homered