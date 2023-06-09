import React, { ReactElement, ReactFragment, useEffect, useState } from 'react';
import { ColorsShort, classNames } from '../../_core';
import style from './index.module.scss';

export type TabItemProps = {
  name: string;
  children?: ReactElement | ReactFragment | null;
};

export function TabItem({ children }: TabItemProps) {
  return <div>{children}</div>;
}

export type TabType = 'btn' | 'line';

export type TabProps = {
  use?: string;
  color?: ColorsShort;
  type?: TabType;
  onSelected?: (arg: string) => void;
  children?: ReactElement;
};

export type TabState = {
  name: string;
  element: ReactElement;
};

export function Tab({ use, type = 'btn', color = 'dark', children, onSelected }: TabProps) {
  const [currTabName, setCurrTabName] = useState<string>(use || '');
  const [data, setData] = useState<TabState[]>([]);

  useEffect(() => {
    if (children) {
      React.Children.forEach(children, (element) => {
        if (element.type === TabItem) {
          setData((list) => [...list, { name: element.props.name, element }]);
        }
      });
    }
  }, []);

  const changeHandler = (name: string) => {
    setCurrTabName(name);
    if (onSelected) {
      onSelected(name);
    }
  };

  return (
    <div>
      <div className={classNames({ [style[`tab--style-${type}`]]: true, [style[`tab--color-${color}`]]: true })}>
        <div className={style.tab}>
          {data.map((tab, index) => (
            <div
              key={index}
              className={classNames({
                [style['tab__item--active']]: tab.name === currTabName,
                click: true,
                [style.tab__item]: true,
              })}
              onClick={() => changeHandler(tab.name)}
            >
              {tab.name}
            </div>
          ))}
        </div>
      </div>
      <div className={style.tabContent}>{data.find((value) => value.name === currTabName)?.element}</div>
    </div>
  );
}
