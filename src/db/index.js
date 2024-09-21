import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('users.db');

export const fetchSession = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE id = ?',
        [1],
        (_, { rows }) => resolve(rows),
        (_, err) => reject(err)
      );
    });
  });
};
