import { useObserver } from 'mobx-react';
import styled from 'styled-components';

import { MessageOutlined, LikeOutlined, DislikeOutlined, EyeOutlined } from '@ant-design/icons';
import { List, Avatar } from 'antd';
import IconText from './_views/IconText/component';

const BoardList = (props) => {
  return useObserver(() => {
    return (
      <List
        loading={props.loading}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={props.dataSource}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={EyeOutlined} text={item.viewCount} key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text={item.rowLike} key="list-vertical-like-o" />,
              <IconText icon={DislikeOutlined} text={item.rowDisLike} key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text={item.commentEntityList.length} key="list-vertical-message" />,
            ]}
          >
            <List.Item.Meta
              title={<a href={`/board/${item.id}`}>{item.title}</a>}
              description={item.contents}
            // avatar={
            //   <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            // }
            />
            {item.content}
          </List.Item>
        )}
      />
    );
  });
};

export default styled(BoardList)``;
