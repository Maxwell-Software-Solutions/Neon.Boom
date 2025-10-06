'use client';
import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n/provider';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchUsersThunk, createUserThunk } from '../../store/usersSlice';
import type { UsersQuery } from '@/app/service/graphQLschemas/generated/typed-documents';

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((s) => s.users);
  const creating = false;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    await dispatch(createUserThunk({ name, email }));
    setName('');
    setEmail('');
    dispatch(fetchUsersThunk());
  };

  const { t } = useI18n();
  return (
    <div style={{ padding: 24 }}>
      <h1>{t('users.title')}</h1>
      {loading && <p>{t('users.loading')}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul>
        {list.map((u: UsersQuery['users'][number]) => (
          <li key={u.id}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
      <form onSubmit={submit} style={{ marginTop: 24, display: 'flex', gap: 8 }}>
        <input placeholder={t('users.name')} value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder={t('users.email')} value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" disabled={creating}>
          {t('users.add')}
        </button>
      </form>
    </div>
  );
}
