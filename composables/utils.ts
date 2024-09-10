export const useUtils = () => {
  function generateUserInitials(name: string) {
    const initials = name.split(' ')
    return initials.map(word => word.charAt(0)).join('')
      .toUpperCase()
  }
  return {
    generateUserInitials,
  }
}
