import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 20,
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
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 50,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  radioOption: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  radioOptionSelecionado: {
    backgroundColor: '#2196F3',
  },
  radioOptionNaoSelecionado: {
    backgroundColor: '#f0f0f0',
  },
  radioTexto: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  radioTextoSelecionado: {
    color: 'white',
  },
  radioTextoNaoSelecionado: {
    color: '#666',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  switchLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  parcelamentoContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#f0f7ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  parcelamentoTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 10,
  },
  parcelamentoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  parcelamentoInputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  botaoCancelar: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  botaoCancelarTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  botaoSalvar: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#2196F3',
  },
  botaoSalvarTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  erro: {
    color: '#f44336',
    fontSize: 12,
    marginTop: 5,
  },
  sucesso: {
    color: '#4CAF50',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
});