import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

import routes from '../../router/router';
// import routes from '@/router/router';
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-node-key': string;
}

const DraggableTabNode = ({ className, ...props }: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props['data-node-key']
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleX: 1 }),
    transition,
    cursor: 'move'
  };

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners
  });
};
const TabsIndex: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDelete, setIsDelete] = useState(false);
  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    console.log(active, over);
    if (active.id !== over?.id) {
      setItems((prev: any) => {
        const activeIndex = prev.findIndex((i: any) => i.key === active.id);
        const overIndex = prev.findIndex((i: any) => i.key === over?.id);
        sessionStorage.setItem('tabsList', JSON.stringify(arrayMove(prev, activeIndex, overIndex)));
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };
  //初始化tabs
  const defaultPanes =
    JSON.parse(sessionStorage.getItem('tabsList') as any) ||
    ([
      {
        label: routes[2].children?.[0].name,
        children: '',
        key: routes[2].children?.[0].path,
        closeIcon: false
      }
    ] as any);

  //tabs的key
  const [activeKey, setActiveKey] = useState(location.pathname);
  //tabs的内容
  const [items, setItems] = useState(defaultPanes);

  //刷新页面时，把当前路由添加到tabs中 监听路由变化
  useEffect(() => {
    // //删除操作时，不需要添加路由
    if (isDelete) {
      setItems(items);
      setIsDelete(false);
      sessionStorage.setItem('tabsList', JSON.stringify(items));
    }
    setItems(defaultPanes);
    sessionStorage.setItem('tabsList', JSON.stringify(defaultPanes));

    //设置当前路由为激活的tab
    setActiveKey(location.pathname);
  }, [location.pathname]);

  const onChange = (key: string) => {
    setActiveKey(key);
    navigate(key);
    JSON.parse(sessionStorage.getItem('tabsList') as any).forEach((item: any) => {
      if (item.key === location.pathname) {
        sessionStorage.setItem('openKey', JSON.stringify([item.openKeys?.[0]]));
      }
    });
  };

  const remove = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane: any) => pane.key === targetKey);
    const newPanes = items.filter((pane: any) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
      navigate(key);
    }
    setIsDelete(true);
    setItems(newPanes);
    sessionStorage.setItem('tabsList', JSON.stringify(newPanes));
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove') {
      remove(targetKey);
    }
  };

  return (
    <div>
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        items={items}
        renderTabBar={(tabBarProps, DefaultTabBar) => (
          <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
            <SortableContext items={items.map((i: any) => i.key)} strategy={horizontalListSortingStrategy}>
              <DefaultTabBar {...tabBarProps}>
                {(node) => (
                  <DraggableTabNode {...node.props} key={node.key}>
                    {node}
                  </DraggableTabNode>
                )}
              </DefaultTabBar>
            </SortableContext>
          </DndContext>
        )}
      />
    </div>
  );
};

export default TabsIndex;
