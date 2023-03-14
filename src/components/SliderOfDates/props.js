import PropTypes from 'prop-types';

const dateProp = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
]).isRequired;

const props = {
    min: dateProp,
    max: dateProp,
    currentMin: dateProp,
    currentMax: dateProp,
    onChange: PropTypes.func.isRequired,
};
export default props;
