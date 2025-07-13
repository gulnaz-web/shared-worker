import React, { useState } from 'react';
import {
   useGetItemsQuery,
   useCreateItemMutation,
   useUpdateItemMutation,
   useDeleteItemMutation,
} from '@/shared/api/services/manager/api';

export const ItemManager: React.FC = () => {
   const { data: items, isLoading, error } = useGetItemsQuery();
   const [createItem] = useCreateItemMutation();
   const [updateItem] = useUpdateItemMutation();
   const [deleteItem] = useDeleteItemMutation();

   const [newTitle, setNewTitle] = useState('');
   const [editingId, setEditingId] = useState<number | null>(null);
   const [editTitle, setEditTitle] = useState('');

   const handleCreate = async () => {
      if (newTitle.trim()) {
         await createItem({ title: newTitle.trim() });
         setNewTitle('');
      }
   };

   const handleUpdate = async (id: number) => {
      if (editTitle.trim()) {
         await updateItem({ id, title: editTitle.trim() });
         setEditingId(null);
         setEditTitle('');
      }
   };

   const handleDelete = async (id: number) => {
      if (confirm('Вы уверены, что хотите удалить этот элемент?')) {
         await deleteItem(id);
      }
   };

   if (isLoading) {
      return (
         <div className="card">
            <div className="loading">
               <span>�� Загрузка элементов...</span>
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="card">
            <div className="error">
               <strong>❌ Ошибка загрузки:</strong> {JSON.stringify(error)}
            </div>
         </div>
      );
   }

   return (
      <div className="card">
         <div className="card-header">
            <h2 className="card-title">📋 Управление элементами</h2>
            <span className="badge badge-success">{items?.length || 0} элементов</span>
         </div>

         {/* Форма создания */}
         <div style={{ marginBottom: '2rem' }}>
            <h3
               style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
               ➕ Добавить новый элемент
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
               <input
                  className="input"
                  placeholder="Введите название элемента..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
               />
               <button className="btn btn-primary" onClick={handleCreate}>
                  Добавить
               </button>
            </div>
         </div>

         {/* Список элементов */}
         <div>
            <h3
               style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
               📝 Список элементов
            </h3>
            {items?.length === 0 ? (
               <div
                  style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  <p>📭 Нет элементов. Добавьте первый!</p>
               </div>
            ) : (
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {items?.map((item) => (
                     <div
                        key={item.id}
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           gap: '1rem',
                           padding: '1rem',
                           border: '1px solid var(--border-color)',
                           borderRadius: 'var(--radius)',
                           background: 'white',
                        }}>
                        {editingId === item.id ? (
                           <>
                              <input
                                 className="input"
                                 value={editTitle}
                                 onChange={(e) => setEditTitle(e.target.value)}
                                 onKeyPress={(e) => e.key === 'Enter' && handleUpdate(item.id)}
                                 style={{ flex: 1 }}
                              />
                              <button
                                 className="btn btn-success btn-sm"
                                 onClick={() => handleUpdate(item.id)}>
                                 ✅ Сохранить
                              </button>
                              <button
                                 className="btn btn-secondary btn-sm"
                                 onClick={() => setEditingId(null)}>
                                 ❌ Отмена
                              </button>
                           </>
                        ) : (
                           <>
                              <span style={{ flex: 1, fontWeight: '500' }}>{item.title}</span>
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                 <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => {
                                       setEditingId(item.id);
                                       setEditTitle(item.title);
                                    }}>
                                    ✏️ Изменить
                                 </button>
                                 <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(item.id)}>
                                    🗑️ Удалить
                                 </button>
                              </div>
                           </>
                        )}
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};
