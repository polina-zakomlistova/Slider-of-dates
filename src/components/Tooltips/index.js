import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from './props';
import { withStyles } from '@material-ui/core/styles';

ValueLabelComponent.propTypes = PropTypes;

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
            maxWidth: '86px',
            textAlign: 'center',
            fontSize: '18px',
            lineHeight: '24px',
            boxShadow: '0px 5px 15px rgba(14, 88, 143, 0.2)',
            borderRadius: '10px',
            '@media(max-width: 769px)': {
                fontSize: '12px',
                lineHeight: '16px',
                minHeight: '40px',
                maxWidth: '50px',
                padding: '3px 8px',
            },
            '@media(max-width: 376px)': {
                fontSize: '10px',
                lineHeight: '14px',
                minHeight: '40px',
                maxWidth: '50px',
            },
        },
        arrow: {
            color: '#ffffff',
        },
        popper: {
            zIndex: 1000,
        },
    }))(Tooltip);
    return (
        <TooltipLight
            open={open}
            placement={index === 0 ? 'top' : 'bottom'}
            title={value}
            TransitionProps={{ timeout: 0 }}
            arrow
        >
            {children}
        </TooltipLight>
    );
}
