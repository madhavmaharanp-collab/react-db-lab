import { supabase } from '../lib/supabase'

export async function getTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function addTask(title) {
  const { data, error } = await supabase
    .from('tasks')
    .insert({ title })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function toggleTask(id, completed) {
  console.log('Updating task:', id, completed)

  const { data, error } = await supabase
    .from('tasks')
    .update({ completed })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Database update failed:', error)
    throw error
  }

  console.log('Updated record:', data)

  return data
}

export async function deleteTask(id) {
  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if (error) throw error
}
