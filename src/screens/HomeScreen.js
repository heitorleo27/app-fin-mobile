import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { financeService } from '../services/api';
import { styles } from './HomeScreen.styles';

export default function HomeScreen({ navigation }) {
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filtro, setFiltro] = useState('todos');

  const hoje = new Date();
  const mesAtual = hoje.getMonth() + 1;
  const anoAtual = hoje.getFullYear();

  const carregarTransacoes = async () => {
    try {
      setLoading(true);
      const dados = await financeService.getTransacoes(mesAtual, anoAtual);
      setTransacoes(dados);
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    carregarTransacoes();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    carregarTransacoes();
  };

  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  const filtrarTransacoes = () => {
    if (filtro === 'todos') return transacoes;
    if (filtro === 'receitas') return transacoes.filter(t => t.tipo === 'receita');
    if (filtro === 'despesas') return transacoes.filter(t => t.tipo === 'despesa');
    return transacoes;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        alert(`Transação: ${item.descricao}\nValor: ${formatarValor(item.valor)}`);
      }}
    >
      <View style={styles.itemEsquerda}>
        <Text style={styles.itemDescricao} numberOfLines={1}>
          {item.descricao}
          {item.parcelado && ` (${item.parcelaAtual}/${item.totalParcelas})`}
        </Text>
        <Text style={styles.itemInfo}>
          {item.categoria} • {item.formaPagamento}
        </Text>
      </View>
      
      <View style={styles.itemDireita}>
        <Text style={[
          styles.itemValor,
          item.tipo === 'receita' ? styles.valorReceita : styles.valorDespesa
        ]}>
          {item.tipo === 'receita' ? '+' : '-'} {formatarValor(item.valor)}
        </Text>
        <Text style={styles.itemData}>
          {formatarData(item.data)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const transacoesFiltradas = filtrarTransacoes();

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transações</Text>
        <Text style={styles.headerSubtitle}>
          {hoje.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </Text>
      </View>

      {/* Filtros */}
      <View style={styles.filtrosContainer}>
        <TouchableOpacity
          style={[
            styles.filtroBotao,
            filtro === 'todos' ? styles.filtroBotaoAtivo : styles.filtroBotaoInativo
          ]}
          onPress={() => setFiltro('todos')}
        >
          <Text style={[
            styles.filtroTexto,
            filtro === 'todos' ? styles.filtroTextoAtivo : styles.filtroTextoInativo
          ]}>
            Todos
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.filtroBotao,
            filtro === 'receitas' ? styles.filtroBotaoAtivo : styles.filtroBotaoInativo
          ]}
          onPress={() => setFiltro('receitas')}
        >
          <Text style={[
            styles.filtroTexto,
            filtro === 'receitas' ? styles.filtroTextoAtivo : styles.filtroTextoInativo
          ]}>
            Receitas
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.filtroBotao,
            filtro === 'despesas' ? styles.filtroBotaoAtivo : styles.filtroBotaoInativo
          ]}
          onPress={() => setFiltro('despesas')}
        >
          <Text style={[
            styles.filtroTexto,
            filtro === 'despesas' ? styles.filtroTextoAtivo : styles.filtroTextoInativo
          ]}>
            Despesas
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Transações */}
      {loading ? (
        <Text style={styles.carregando}>Carregando transações...</Text>
      ) : transacoesFiltradas.length === 0 ? (
        <Text style={styles.semDados}>
          {filtro === 'todos' 
            ? 'Nenhuma transação encontrada' 
            : `Nenhuma ${filtro} encontrada`}
        </Text>
      ) : (
        <FlatList
          data={transacoesFiltradas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listaContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {/* Botão Flutuante para Adicionar */}
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('Add')}
      >
        <Text style={styles.botaoAdicionarTexto}>+</Text>
      </TouchableOpacity>
    </View>
  );
}