// src/screens/DashboardScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { financeService } from '../services/api';
import { styles } from './DashboardScreen.styles';

export default function DashboardScreen({ navigation }) {
  const [resumo, setResumo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const hoje = new Date();
  const mesAtual = hoje.getMonth() + 1;
  const anoAtual = hoje.getFullYear();

  const carregarDados = async () => {
    try {
      setLoading(true);
      const dados = await financeService.getResumo(mesAtual, anoAtual);
      setResumo(dados);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    carregarDados();
  };

  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  if (loading && !resumo) {
    return (
      <View style={styles.container}>
        <Text style={styles.carregando}>Carregando dados...</Text>
        <Text style={styles.dica}>Verifique se o backend está rodando em:</Text>
        <Text style={styles.ip}>http://192.168.1.7:3000</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.titulo}>App Fin</Text>
        <Text style={styles.subtitulo}>Controle Financeiro Pessoal</Text>
        <Text style={styles.mesAtual}>
          {hoje.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </Text>
      </View>

      {/* Cards de Resumo */}
      <View style={styles.cardsContainer}>
        <View style={[styles.card, styles.cardReceita]}>
          <Text style={styles.cardTitulo}>Receitas</Text>
          <Text style={styles.cardValor}>
            {formatarValor(resumo?.receitas || 0)}
          </Text>
        </View>

        <View style={[styles.card, styles.cardDespesa]}>
          <Text style={styles.cardTitulo}>Despesas</Text>
          <Text style={styles.cardValor}>
            {formatarValor(resumo?.despesas || 0)}
          </Text>
        </View>

        <View
          style={[
            styles.card,
            styles.cardSaldo,
            (resumo?.saldo || 0) < 0 && styles.cardSaldoNegativo,
          ]}
        >
          <Text style={styles.cardTitulo}>Saldo</Text>
          <Text style={styles.cardValor}>
            {formatarValor(resumo?.saldo || 0)}
          </Text>
        </View>
      </View>

      {/* Cartão */}
      {resumo?.cartoes?.map((cartao) => (
        <View key={cartao.id} style={styles.cartaoContainer}>
          <Text style={styles.cartaoTitulo}>{cartao.nome}</Text>
          <View style={styles.cartaoInfo}>
            <View style={styles.cartaoItem}>
              <Text style={styles.cartaoLabel}>Limite:</Text>
              <Text style={styles.cartaoValor}>
                {formatarValor(cartao.limite)}
              </Text>
            </View>
            <View style={styles.cartaoItem}>
              <Text style={styles.cartaoLabel}>Utilizado:</Text>
              <Text style={styles.cartaoValor}>
                {formatarValor(cartao.utilizado)}
              </Text>
            </View>
            <View style={styles.cartaoItem}>
              <Text style={styles.cartaoLabel}>Disponível:</Text>
              <Text style={[styles.cartaoValor, styles.disponivel]}>
                {formatarValor(cartao.disponivel)}
              </Text>
            </View>
          </View>
        </View>
      ))}

      {/* Botões de Ação */}
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.botaoPrincipal}
          onPress={() => navigation.navigate('Add')}
        >
          <Text style={styles.botaoTexto}>+ Nova Transação</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoSecundario}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.botaoSecundarioTexto}>
            Ver Todas as Transações
          </Text>
        </TouchableOpacity>
      </View>

      {/* Status da Conexão */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusTitulo}>Status da Conexão</Text>
        <View style={styles.statusItem}>
          <View style={[styles.statusDot, styles.statusAtivo]} />
          <Text style={styles.statusTexto}>Backend: Conectado</Text>
        </View>
        <View style={styles.statusItem}>
          <View style={[styles.statusDot, styles.statusAtivo]} />
          <Text style={styles.statusTexto}>
            API: {resumo ? 'Online' : 'Offline'}
          </Text>
        </View>
        <Text style={styles.ipInfo}>IP: 192.168.1.7:3000</Text>
      </View>
    </ScrollView>
  );
}