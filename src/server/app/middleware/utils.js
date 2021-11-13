const checkPropsExist = (obj, props) => {
    const missingProps = props.filter(prop => !(prop in obj));
    return {
        success: (missingProps.length === 0),
        missingArray: missingProps,
        missingString: missingProps.join(', ')
    }
};

const checkPropsNotEmpty = (obj, props) => {
    const emptyProps = props.filter(prop => obj[prop] === '');
    return {
        success: (emptyProps.length === 0),
        missingArray: emptyProps,
        missingString: emptyProps.join(', ')
    }
};

const things = {
    checkPropsExist: checkPropsExist,
    checkPropsNotEmpty: checkPropsNotEmpty,
};

module.exports = things;

// export function checkPropNonempty(obj, props) {
//     const emptyProps = props.filter(prop => prop === '');
//     return (emptyProps.length === 0 || emptyProps.length === props.length)
//         ? true
//         : 'missing ' + emptyProps.join(', ');
// };

