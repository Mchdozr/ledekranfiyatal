-- Test / mock modu icin ornek tedarikciler (sabit UUID ile tekrar calistirmada cakisma yok)
insert into public.suppliers (id, name, phone, city, active, priority, notes)
values
  (
    '00000000-0000-4000-a000-000000000001',
    '[TEST] Led Pro İstanbul',
    '+905551110001',
    'İstanbul',
    true,
    0,
    'Mock/web test — gercek arama yapilmaz'
  ),
  (
    '00000000-0000-4000-a000-000000000002',
    '[TEST] Ekran Dünyası Ankara',
    '+905551110002',
    'Ankara',
    true,
    0,
    'Mock/web test — gercek arama yapilmaz'
  )
on conflict (id) do nothing;
