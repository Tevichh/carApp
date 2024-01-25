import './styleLoad.css'

const Progress = () => {
    return (
        <div class="progress-bar-container">
            <label for="progress-bar">Loading...</label>
            <progress id="progress-bar" value="0" max="100"></progress>
        </div>
    )
}
export default Progress