import { useObserver } from 'mobx-react';
import styled from 'styled-components';

import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { List } from 'antd';
import IconText from '../_views/IconText/component';

const BoardList = (props) => {
  return useObserver(() => {
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 1,
        }}
        dataSource={props.dataSource}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text={item.likeCnt} key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
          >
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    );
  });
};

export default styled(BoardList)``;
