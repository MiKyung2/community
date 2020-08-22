import moment from 'moment';
import 'moment/locale/ko';
import { Tooltip } from "antd";

export const formatDateWithTooltip = date => {
    return <Tooltip title={moment(date).format('YYYY-MM-DD HH:mm:ss')}>
            {moment(date).fromNow()}
        </Tooltip>
}

export const formatDate = date => {
    const formatted = moment(date).format('YYYY-MM-DD HH:mm:ss');
    return formatted
}