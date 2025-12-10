import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { financeService } from '../services/api';
import { styles } from './AddScreen.styles';

export default function AddScreen({ navigation }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('despesa');
  const [categoria, setCategoria] = useState('Alimentação');
  const [formaPagamento, setFormaPagamento] = useState('dinheiro');
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  
  const [parcelado, setParcelado] = useState(false);
  const [totalParcelas, setTotalParcelas] = useState('1');
  const [primeiraParcela, setPrimeiraParcela] = useState(data);
  
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const dados = await financeService.getCategorias();
        setCategorias(dados);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        setCategorias([
          { id: 1, nome: 'Alimentação' },
          { id: 2, nome: 'Transporte' },
          { id: 3, nome: 'Lazer' },
          { id: 4, nome: 'Saúde' },
          { id: 5, nome: 'Educação' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    carregarCategorias();
  }, []);

  const formatarValorInput = (text) => {
    const numeros = text.replace(/[^0-9]/g, '');
    
    if (numeros === '') {
      setValor('');
      return;
    }
    
    const valorDecimal = parseInt(numeros, 10) / 100;
    setValor(valorDecimal.toFixed(2).replace('.', ','));
  };

  const getValorNumerico = () => {
    if (!valor) return 0;
    return parseFloat(valor.replace(',', '.'));
  };

  const validarFormulario = () => {
    setErro('');
    
    if (!descricao.trim()) {
      setErro('Digite uma descrição');
      return false;
    }
    
    if (!valor || getValorNumerico() <= 0) {
      setErro('Digite um valor válido');
      return false;
    }
    
    if (parcelado) {
      const parcelas = parseInt(totalParcelas, 10);
      if (isNaN(parcelas) || parcelas < 1) {
        setErro('Número de parcelas inválido');
        return false;
      }
    }
    
    return true;
  };

  const salvarTransacao = async () => {
    if (!validarFormulario()) return;
    
    setSalvando(true);
    setSucesso('');
    
    try {
      const transacao = {
        descricao,
        valor: getValorNumerico(),
        tipo,
        categoria,
        formaPagamento,
        data: primeiraParcela,
        parcelado,
        totalParcelas: parcelado ? parseInt(totalParcelas, 10) : 1,
        parcelaAtual: 1,
      };
      
      await financeService.addTransacao(transacao);
      
      setSucesso('Transação salva com sucesso!');
      
      setTimeout(() => {
        setDescricao('');
        setValor('');
        setTipo('despesa');
        setCategoria('Alimentação');
        setFormaPagamento('dinheiro');
        setParcelado(false);
        setTotalParcelas('1');
        setSucesso('');
        
        setTimeout(() => {
          navigation.navigate('Home');
        }, 500);
      }, 1500);
      
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
      setErro('Erro ao salvar transação. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  };

  const cancelar = () => {
    navigation.goBack();
  };

  const formasPagamento = [
    { label: 'Dinheiro', value: 'dinheiro' },
    { label: 'Cartão de Crédito', value: 'cartao' },
    { label: 'PIX', value: 'pix' },
    { label: 'Débito Automático', value: 'debito' },
  ];

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando categorias...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nova Transação</Text>
        <Text style={styles.headerSubtitle}>Preencha os dados abaixo</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tipo</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={[
                styles.radioOption,
                tipo === 'receita' && styles.radioOptionSelecionado
              ]}
              onPress={() => setTipo('receita')}
            >
              <Text style={[
                styles.radioTexto,
                tipo === 'receita' && styles.radioTextoSelecionado
              ]}>
                Receita
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.radioOption,
                tipo === 'despesa' && styles.radioOptionSelecionado
              ]}
              onPress={() => setTipo('despesa')}
            >
              <Text style={[
                styles.radioTexto,
                tipo === 'despesa' && styles.radioTextoSelecionado
              ]}>
                Despesa
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Ex: Supermercado, Salário..."
            maxLength={100}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Valor (R$)</Text>
          <TextInput
            style={styles.input}
            value={valor}
            onChangeText={formatarValorInput}
            placeholder="0,00"
            keyboardType="numeric"
            maxLength={15}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Categoria</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={categoria}
              onValueChange={setCategoria}
              style={styles.picker}
            >
              {categorias.map((cat) => (
                <Picker.Item
                  key={cat.id || cat.nome}
                  label={cat.nome}
                  value={cat.nome}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Forma de Pagamento</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formaPagamento}
              onValueChange={setFormaPagamento}
              style={styles.picker}
            >
              {formasPagamento.map((fp) => (
                <Picker.Item
                  key={fp.value}
                  label={fp.label}
                  value={fp.value}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Data</Text>
          <TextInput
            style={styles.input}
            value={data}
            onChangeText={setData}
            placeholder="AAAA-MM-DD"
            maxLength={10}
          />
          <Text style={styles.helpText}>
            Formato: AAAA-MM-DD (ex: 2024-12-10)
          </Text>
        </View>

        <View style={styles.formGroup}>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>É parcelado?</Text>
            <Switch
              value={parcelado}
              onValueChange={setParcelado}
              trackColor={{ false: '#ddd', true: '#2196F3' }}
              thumbColor={parcelado ? '#fff' : '#f4f3f4'}
            />
          </View>

          {parcelado && (
            <View style={styles.parcelamentoContainer}>
              <Text style={styles.parcelamentoTitulo}>Detalhes do Parcelamento</Text>
              
              <View style={styles.parcelamentoRow}>
                <View style={styles.parcelamentoInputContainer}>
                  <Text style={styles.label}>Nº de Parcelas</Text>
                  <TextInput
                    style={styles.input}
                    value={totalParcelas}
                    onChangeText={setTotalParcelas}
                    keyboardType="numeric"
                    maxLength={3}
                  />
                </View>
                
                <View style={styles.parcelamentoInputContainer}>
                  <Text style={styles.label}>1ª Parcela</Text>
                  <TextInput
                    style={styles.input}
                    value={primeiraParcela}
                    onChangeText={setPrimeiraParcela}
                    placeholder="AAAA-MM-DD"
                    maxLength={10}
                  />
                </View>
              </View>
              
              {parseInt(totalParcelas, 10) > 1 && (
                <Text style={styles.sucesso}>
                  {totalParcelas} parcelas serão geradas automaticamente!
                </Text>
              )}
            </View>
          )}
        </View>

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        {sucesso ? <Text style={styles.sucesso}>{sucesso}</Text> : null}

        <View style={styles.botoesContainer}>
          <TouchableOpacity
            style={styles.botaoCancelar}
            onPress={cancelar}
            disabled={salvando}
          >
            <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botaoSalvar, salvando && styles.botaoSalvarDisabled]}
            onPress={salvarTransacao}
            disabled={salvando}
          >
            <Text style={styles.botaoSalvarTexto}>
              {salvando ? 'Salvando...' : 'Salvar Transação'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}