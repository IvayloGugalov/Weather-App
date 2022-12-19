
export type InvalidLocation = {
  header: string,
  description: string
}

export const InvalidLocation = () => {
  return {
    header: 'Oops! Invalid location ...',
    description: 'Try searching for a another city.'
  }
}