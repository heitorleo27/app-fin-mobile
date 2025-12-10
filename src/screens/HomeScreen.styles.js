import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 5,
  },
  filtrosContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  filtroBotao: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  filtroBotaoAtivo: {
    backgroundColor: '#2196F3',
  },
  filtroBotaoInativo: {
    backgroundColor: '#f0f0f0',
  },
  filtroTexto: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  filtroTextoAtivo: {
    color: 'white',
  },
  filtroTextoInativo: {
    color: '#666',
  },
  listaContainer: {
    padding: 15,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemEsquerda: {
    flex: 1,
  },
  itemDescricao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemInfo: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  itemDireita: {
    alignItems: 'flex-end',
  },
  itemValor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  valorReceita: {
    color: '#4CAF50',
  },
  valorDespesa: {
    color: '#F44336',
  },
  itemData: {
    fontSize: 11,
    color: '#888',
    marginTop: 3,
  },
  semDados: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
  carregando: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  botaoAdicionar: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2196F3',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  botaoAdicionarTexto: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -3,
  },
});