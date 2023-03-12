import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

export default function ValueLabelComponent(props) {
    const { children, open, value, index } = props;

    const TooltipLight = withStyles(() => ({
        tooltip: {
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontWeight: 600,
            backgroundColor: '#ffffff',
            color: '#0167B3',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '6px 14px',
            minHeight: '66px',
            maxWidth: '66px',
            textAlign: 'center',
            fontSize: '18px',
            lineHeight: '24px',
            boxShadow: '0px 5px 15px rgba(14, 88, 143, 0.2)',
            borderRadius: '10px',
        },
        arrow: {
            color: '#ffffff',
        },
    }))(Tooltip);
    return (
        <TooltipLight
            open={open}
            placement={index === 0 ? 'top' : 'bottom'}
            title={value}
            enterDelay={1000}
            arrow
        >
            {children}
        </TooltipLight>
    );
}
