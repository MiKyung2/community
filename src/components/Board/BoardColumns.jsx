import { Tooltip } from "antd";
import { formatDateWithTooltip } from '../../utils/dateFormatter';
import { numFormatter } from '../../utils/numFormatter';

export const boardColumns = [
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      render: title => <span id="title" className="hover">{title}</span>
    }, {
      title: "작성자",
      dataIndex: "writer",
      key: "writer",
      render: writer => (
        <Tooltip title="프로필 이동">
          <span id="writer" data-name={writer} className="hover">{writer}</span>
        </Tooltip>)
    }, {
      title: "좋아요",
      dataIndex: "rowLike",
      key: "rowLike",
      render: like => <span>{numFormatter(like)}</span>
    }, {
      title: "조회수",
      dataIndex: "viewCount",
      key: "viewCount",
      render: view => <span>{numFormatter(view)}</span>
    }, {
      title: "댓글수",
      dataIndex: "commentCnt",
      key: "commentCnt",
      render: comment => <span>{numFormatter(comment)}</span>
    },
    {
      title: "날짜",
      dataIndex: "createdDate",
      key: "createdDate",
      render: date => (
        <span>
          {formatDateWithTooltip(date)}
        </span>
      )
    },
  ];