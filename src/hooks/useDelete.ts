import axios from 'axios';

export const useDelete = (url: string) => {
  const del = async (id: string) => {
    try {
      await axios.delete(`${url}/${id}`);
    } catch (error) {
      console.error(`Error deleting product: ${(error as Error).message}`);
      throw new Error(`Failed to delete product: ${(error as Error).message}`);
    }
  };

  return { delete: del };
};
