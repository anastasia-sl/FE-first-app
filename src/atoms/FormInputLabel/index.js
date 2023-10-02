import './style.scss';
import PropTypes from "prop-types";

function InputLabel(props) {
    const {title} = props
    return (
        <label className='InputLabel'>{title}</label>
    );
}

InputLabel.propTypes = {
    title: PropTypes.string
}
export default InputLabel;

