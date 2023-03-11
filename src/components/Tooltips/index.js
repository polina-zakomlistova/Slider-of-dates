import Tooltip from '@material-ui/core/Tooltip';

export default function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip
            open={open}
            enterTouchDelay={0}
            placement="top"
            title={value}
            arrow
        >
            {children}
        </Tooltip>
    );
}
