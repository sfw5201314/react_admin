import { useEffect, useState, useCallback } from 'react';
export function useSessionStorageListener(key: any) {
  const [value, setValue] = useState(() => sessionStorage.getItem(key));

  const handleStorageChange = useCallback(
    (e: any) => {
      // 检查 key 是否匹配，并且事件是否来自当前窗口
      if (e.key === key && e.newValue !== e.oldValue && e.storageArea === sessionStorage) {
        setValue(e.newValue);
      }
    },
    [key]
  );

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [handleStorageChange]);

  return value;
}
